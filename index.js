const { 
    Client, 
    GatewayIntentBits, 
    EmbedBuilder, 
    ActionRowBuilder, 
    ButtonBuilder, 
    ButtonStyle, 
    StringSelectMenuBuilder, 
    StringSelectMenuOptionBuilder, 
    ModalBuilder, 
    TextInputBuilder, 
    TextInputStyle, 
    ChannelType, 
    PermissionFlagsBits
} = require('discord.js');
const express = require('express');
require('dotenv').config();

const client = new Client({ 
    intents: [
        GatewayIntentBits.Guilds, 
        GatewayIntentBits.GuildMessages, 
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers
    ] 
});

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Bot Discord est en ligne !');
});

app.listen(port, () => {
    console.log(`Serveur de maintien en ligne actif sur le port ${port}`);
});

// --- CONFIGURATION DU BOT ---
const LOG_CHANNEL_ID = '1503731703145955359'; 
const WELCOME_CHANNEL_ID = '1502587205611421867'; // Salon #pick-up
const ANNONCE_CHANNEL_ID = '1508005069247741952'; // Salon #enseignement

const tempAnswers = new Map();

client.once('ready', () => {
    console.log(`✅ Spider-Bot opérationnel : ${client.user.tag}`);
});

// 3. GESTION DES SALONS TEXTUELS
client.on('messageCreate', async (message) => {
    
    // --- NETTOYAGE AUTO : SALON #PICK-UP (20 SECONDES) ---
    if (message.channel.id === WELCOME_CHANNEL_ID) {
        setTimeout(() => {
            message.delete().catch(() => {});
        }, 20000); 
    }

    // --- NETTOYAGE AUTO : SALON #ENSEIGNEMENT ---
    if (message.channel.id === ANNONCE_CHANNEL_ID) {
        // 1. Si c'est le BOT, on programme la suppression dans 2 heures
        if (message.author.id === client.user.id) {
            setTimeout(() => {
                message.delete().catch(() => {});
            }, 7200000); // 2 heures
        } 
        // 2. Si c'est un UTILISATEUR, on supprime INSTANTANÉMENT son message
        else if (!message.author.bot) {
            await message.delete().catch(() => {});
        }
    }

    if (message.author.bot) return;

    // --- SALON #PICK-UP (RECRUTEMENT AUTOMATIQUE) ---
    if (message.channel.id === WELCOME_CHANNEL_ID) {
        const welcomeEmbed = new EmbedBuilder()
            .setColor(0xFF0000)
            .setTitle('👋 Bienvenue — Spider-society')
            .setDescription("Merci d'avoir rejoint notre serveur !\n\n**Spider-society** est une agence spécialisée dans la gestion de créateurs OF. Nous sommes actuellement à la recherche de **Chatters** motivés.")
            .addFields(
                { name: '💬 Chatter (Vendeur)', value: "Ton rôle : gérer les conversations et maximiser les ventes.\n• Excellente communication écrite\n• Maîtrise des techniques de vente\n• Disponibilité quotidienne", inline: false },
                { name: '\u200B', value: '➡️ **cliquer sur le bouton ci-dessous pour postuler**', inline: false }
            )
            .setFooter({ text: 'Spider-society' });

        const row = new ActionRowBuilder().addComponents(
            new ButtonBuilder().setCustomId('open_ticket').setLabel('🚀 Postuler ici').setStyle(ButtonStyle.Primary)
        );

        await message.channel.send({ embeds: [welcomeEmbed], components: [row] });
    }

    // --- SALON #ENSEIGNEMENT (FORMATION EN EMBEDS) ---
    if (message.channel.id === ANNONCE_CHANNEL_ID && message.content.toLowerCase().trim() === 'formation') {
        
        // EMBED 1 : RÈGLES OPÉRATIONNELLES & LIEN ÉMOTIONNEL
        const embed1 = new EmbedBuilder()
            .setColor(0x00FF00)
            .setTitle('🎓 FORMATION CHATTING — RÈGLES & PROCÉDURES')
            .setDescription("Consignes agence pour convertir vos abonnés efficacement.")
            .addFields(
                { 
                    name: '1️⃣ LE KYC (Connaissance Client)', 
                    value: "• **Observation :** À l'ouverture d'un message sur Inflow, lisez toujours l'historique. Ne perdez pas le fil de la discussion entamée par le chatteur précédent.\n" +
                           "• **Profilage :** Observez ou rebondissez sur ses réponses pour obtenir discrètement son job, sa routine, son âge, etc.\n" +
                           "• *Exemple :* Utilisez directement le script KYC ou inspirez-en vous pour créer une référence similaire : *« D'ailleurs, tu fais quoi dans la vie en dehors du boulot ? 🤭 »*" 
                },
                { 
                    name: '2️⃣ POSITIONNEMENT DE LA CRÉATRICE (Douceur & Fragilité)', 
                    value: "• Incarnez une personnalité innocente, timide et fragile qui a besoin d'être rassurée (référez-vous à la fiche de la modèle).\n" +
                           "• **Interdiction** d'être trop agressive ou frontale dans l'approche avec les subs." 
                },
                { 
                    name: '3️⃣ VITESSE D\'EXÉCUTION', 
                    value: "• Vous disposez de **3 à 4 minutes maximum** pour répondre à chaque sub, qu'il y ait peu ou beaucoup de messages non lus (unread)." 
                }
            );

        // EMBED 2 : PRIORISATIONS & MANIÈRE DE PARLER
        const embed2 = new EmbedBuilder()
            .setColor(0x00FF00)
            .setTitle('🎓 FORMATION CHATTING — PRIORITÉS & ENGAGEMENT')
            .addFields(
                { 
                    name: '4️⃣ GESTION DES PRIORITÉS (Trafic élevé)', 
                    value: "Classez vos actions par ordre d'importance :\n" +
                           "1. **Spenders** (abonnés ayant déjà dépensé).\n" +
                           "2. **Abonnés en cours de sexualisation** ou en phase de script.\n" +
                           "3. **Nouveaux abonnés** (Pensez à les ajouter dans le tab en cliquant sur *Open new tab* s'ils n'y sont pas)." 
                },
                { 
                    name: '5️⃣ MANIÈRE DE PARLER (Un lien émotionnel = de l\'argent)', 
                    value: "• Utilisez des surnoms affectifs (par défaut : *« mon chat »*).\n" +
                           "• Rendez vos messages captivants et engageants. Ne soyez pas un bot robotique.\n\n" +
                           "❌ **À NE PAS FAIRE (fade) :**\n" +
                           "*Sub : Tu fais quoi là ?*\n" +
                           "*Chatter : Je ne fais rien et toi ? Je suis posé sur mon lit et toi ?*\n\n" +
                           "✅ **À FAIRE (immersif et vendeur) - Ancien Spender :**\n" +
                           "*« Mon chat, je vais aller sous la douche, j'aimerais bien que tu sois avec moi sous l'eau chaude pour me laver et me caresser partout... 😘 Je sens déjà l'excitation monter en pensant à tes mains sur ma peau »*\n\n" +
                           "✅ **À FAIRE (immersif et vendeur) - Nouveau Sub :**\n" +
                           "*« Je suis installée sur le canapé devant un film, mais je n'arrive pas à me concentrer... »*" 
                }
            );

        // EMBED 3 : LE BUT & GESTION DU SEXE
        const embed3 = new EmbedBuilder()
            .setColor(0x00FF00)
            .setTitle('🎓 FORMATION CHATTING — GESTION DU TUNNEL DE VENTE')
            .addFields(
                { 
                    name: '6️⃣ LE BUT : LAISSER LE SUB SEXUALISER EN PREMIER', 
                    value: "La règle d'or : **C'est l'abonné qui doit aborder le sexe en premier**, pas vous.\n" +
                           "Votre rôle est d'ouvrir la porte de manière indirecte et innocente, en le laissant deviner.\n\n" +
                           "💡 **Exemple d'ouverture sexy indirecte :**\n" +
                           "• *Vous dites :* « J'ai eu une journée de malade... J'ai trop besoin d'une douche pour me changer les idées. »\n" +
                           "• *L'effet produit :* Cela laisse deviner, cela reste innocent, cela ouvre une brèche, et c'est **LUI** qui va sexualiser l'échange le premier." 
                }
            )
            .setFooter({ text: 'Spider-Society • Discipline = Cash 🔑' });

        await message.channel.send({ embeds: [embed1] });
        await message.channel.send({ embeds: [embed2] });
        await message.channel.send({ embeds: [embed3] });
    }
});

// 4. GESTION DU FLUX DES INTERACTIONS (RECRUTEMENT)
client.on('interactionCreate', async (interaction) => {
    const userId = interaction.user.id;
    const { guild, member } = interaction;

    if (interaction.isButton() && interaction.customId === 'open_ticket') {
        try {
            const safeName = `recrutement-de-${member.displayName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}`;
            const existingChannel = guild.channels.cache.find(c => c.name === safeName);
            
            if (existingChannel) {
                return await interaction.reply({ content: `⚠️ Tu as déjà un salon ouvert ici : ${existingChannel}`, ephemeral: true });
            }

            const channel = await guild.channels.create({
                name: safeName,
                type: ChannelType.GuildText,
                permissionOverwrites: [
                    { id: guild.roles.everyone, deny: [PermissionFlagsBits.ViewChannel] },
                    { id: userId, allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages, PermissionFlagsBits.ReadMessageHistory] }
                ],
            });

            tempAnswers.set(userId, { type: 'RECRUTEMENT' });

            const menu = new ActionRowBuilder().addComponents(
                new StringSelectMenuBuilder()
                    .setCustomId('select_poste')
                    .setPlaceholder('Choisis le poste...')
                    .addOptions(new StringSelectMenuOptionBuilder().setLabel('Chatter').setValue('chatter').setEmoji('💬'))
            );

            await channel.send({ 
                content: `<@${userId}>`, 
                embeds: [new EmbedBuilder().setColor(0xFF0000).setTitle('🎯 Candidature').setDescription("Sélectionne le poste ci-dessous pour commencer.")], 
                components: [menu] 
            });
            
            await interaction.reply({ content: `✅ Salon créé avec succès !`, ephemeral: true });

        } catch (e) { 
            console.error(e); 
        }
    } 
    else if (interaction.isStringSelectMenu() && interaction.customId === 'select_poste') {
        const modal = new ModalBuilder().setCustomId('modal_infos').setTitle('📝 Infos Personnelles (1/3)');
        modal.addComponents(
            new ActionRowBuilder().addComponents(new TextInputBuilder().setCustomId('q1').setLabel("Nom et âge").setPlaceholder("Ex: Thomas, 25 ans").setStyle(TextInputStyle.Short).setRequired(true)),
            new ActionRowBuilder().addComponents(new TextInputBuilder().setCustomId('q2').setLabel("Origine et sexe").setPlaceholder("Ex: France, Homme").setStyle(TextInputStyle.Short).setRequired(true)),
            new ActionRowBuilder().addComponents(new TextInputBuilder().setCustomId('q3').setLabel("Expérience (OF)").setPlaceholder("Détaille tes expériences passées...").setStyle(TextInputStyle.Paragraph).setRequired(true)),
            new ActionRowBuilder().addComponents(new TextInputBuilder().setCustomId('q4').setLabel("Langues maîtrisées").setPlaceholder("Ex: Français, Anglais").setStyle(TextInputStyle.Short).setRequired(true)),
            new ActionRowBuilder().addComponents(new TextInputBuilder().setCustomId('q5').setLabel("Jours de travail").setPlaceholder("Ex: 6/7 ou Lundi au Samedi").setStyle(TextInputStyle.Short).setRequired(true))
        );
        await interaction.showModal(modal);
    } 
    else if (interaction.isModalSubmit() && interaction.customId === 'modal_infos') {
        const data = tempAnswers.get(userId) || {};
        data.infos = {
            nom: interaction.fields.getTextInputValue('q1'),
            origine: interaction.fields.getTextInputValue('q2'),
            exp: interaction.fields.getTextInputValue('q3'),
            langues: interaction.fields.getTextInputValue('q4'),
            jours: interaction.fields.getTextInputValue('q5')
        };
        tempAnswers.set(userId, data);
        
        const row = new ActionRowBuilder().addComponents(
            new ButtonBuilder().setCustomId('open_p2').setLabel('🎯 Étape Suivante (Compétences)').setStyle(ButtonStyle.Success)
        );
        await interaction.reply({ content: "✅ Infos enregistrées ! Passons aux questions de compétences.", components: [row], ephemeral: true });
    } 
    else if (interaction.isButton() && interaction.customId === 'open_p2') {
        if (!tempAnswers.has(userId)) return await interaction.reply({ content: "❌ Session introuvable, veuillez réouvrir un ticket.", ephemeral: true });
        
        const modal = new ModalBuilder().setCustomId('modal_comp').setTitle('Test de Compétences (2/3)');
        modal.addComponents(
            new ActionRowBuilder().addComponents(new TextInputBuilder().setCustomId('c1').setLabel("Comb de conv. tu gères en même temps ?").setPlaceholder("Ex: 5-8 conversations").setStyle(TextInputStyle.Short).setRequired(true)),
            new ActionRowBuilder().addComponents(new TextInputBuilder().setCustomId('c2').setLabel("C'est quoi le chatting ?").setPlaceholder("Donne ta vision (lien, fidélisation, vente)...").setStyle(TextInputStyle.Paragraph).setRequired(true)),
            new ActionRowBuilder().addComponents(new TextInputBuilder().setCustomId('c3').setLabel("Le KYC c'est quoi ?").setPlaceholder("Définition, ce que ça représente pour toi et son importance.").setStyle(TextInputStyle.Paragraph).setRequired(true)),
            new ActionRowBuilder().addComponents(new TextInputBuilder().setCustomId('c4').setLabel("Quoi faire attention chatting ?").setPlaceholder("Orthographe, réactivité, empathie").setStyle(TextInputStyle.Short).setRequired(true))
        );
        await interaction.showModal(modal);
    } 
    else if (interaction.isModalSubmit() && interaction.customId === 'modal_comp') {
        const data = tempAnswers.get(userId);
        if (!data) return await interaction.reply({ content: "❌ Session expirée.", ephemeral: true });
        
        data.comp = {
            conv: interaction.fields.getTextInputValue('c1'),
            chatting: interaction.fields.getTextInputValue('c2'),
            kyc: interaction.fields.getTextInputValue('c3'),
            attention: interaction.fields.getTextInputValue('c4')
        };
        tempAnswers.set(userId, data);
        
        const row = new ActionRowBuilder().addComponents(
            new ButtonBuilder().setCustomId('open_p3').setLabel('✍️ Étape Suivante (Scénarios)').setStyle(ButtonStyle.Success)
        );
        await interaction.reply({ content: "✅ Compétences validées ! Place aux scénarios de chat.", components: [row], ephemeral: true });
    } 
    else if (interaction.isButton() && interaction.customId === 'open_p3') {
        if (!tempAnswers.has(userId)) return await interaction.reply({ content: "❌ Session introuvable, veuillez réouvrir un ticket.", ephemeral: true });
        
        const modal = new ModalBuilder().setCustomId('modal_scen').setTitle('Scénarios de Chat (3/3)');
        modal.addComponents(
            new ActionRowBuilder().addComponents(new TextInputBuilder().setCustomId('s1').setLabel("Scénario 1 : Ventes").setPlaceholder("L'abonné dit : 'je ne suis pas sûr de payer c'est trop chère'. Comment réponds-tu ?").setStyle(TextInputStyle.Paragraph).setRequired(true)),
            new ActionRowBuilder().addComponents(new TextInputBuilder().setCustomId('s2').setLabel("Scénario 2 : Contenu").setPlaceholder("The sub dmd un média que la modèle ne peut pas faire. Comment réponds-tu ?").setStyle(TextInputStyle.Paragraph).setRequired(true)),
            new ActionRowBuilder().addComponents(new TextInputBuilder().setCustomId('s3').setLabel("Scénario 3 : Terme GFE").setPlaceholder("Explique ce que ça représente pour toi et son importance.").setStyle(TextInputStyle.Paragraph).setRequired(true))
        );
        await interaction.showModal(modal);
    } 
    else if (interaction.isModalSubmit() && interaction.customId === 'modal_scen') {
        await interaction.deferReply({ ephemeral: true });
        const data = tempAnswers.get(userId);
        
        if (!data || !data.infos || !data.comp) {
            return await interaction.editReply({ content: "❌ Une erreur est survenue lors de la récupération de vos données." });
        }

        const logChannel = interaction.guild.channels.cache.get(LOG_CHANNEL_ID);
        
        const txtChatting = data.comp.chatting ? data.comp.chatting.toLowerCase() : "";
        const txtKyc = data.comp.kyc ? data.comp.kyc.toLowerCase() : "";
        const txtS1 = interaction.fields.getTextInputValue('s1').toLowerCase();
        const txtS2 = interaction.fields.getTextInputValue('s2').toLowerCase();
        const txtS3 = interaction.fields.getTextInputValue('s3').toLowerCase();

        const embedFields = [
            { name: '👤 Informations Candidat', value: `**Nom/Age:** ${data.infos.nom}\n**Langues:** ${data.infos.langues}\n**Dispo:** ${data.infos.jours}`, inline: false },
            { name: '📩 Expérience (OF)', value: data.infos.exp, inline: false },
            { name: '🧠 Réponses aux Compétences', value: `**Simultané :** ${data.comp.conv}\n**Vision Chatting :** ${data.comp.chatting}\n**Définition KYC :** ${data.comp.kyc}\n**Points de vigilance :** ${data.comp.attention}`, inline: false },
            { name: '🎭 Scénarios Pratiques', value: `**S1 (Prix) :** ${interaction.fields.getTextInputValue('s1')}\n**S2 (Refus) :** ${interaction.fields.getTextInputValue('s2')}\n**S3 (GFE) :** ${interaction.fields.getTextInputValue('s3')}`, inline: false }
        ];

        let score = 0;

        if (txtKyc.includes("connaître") || txtKyc.includes("connaitre") || txtKyc.includes("savoir")) score += 2;
        if (txtKyc.includes("info") || txtKyc.includes("base") || txtKyc.includes("ficher") || txtKyc.includes("notes") || txtKyc.includes("profil")) score += 1.5;
        if (txtKyc.includes("besoin") || txtKyc.includes("goût") || txtKyc.includes("gout") || txtKyc.includes("préférence")) score += 1.5;

        if (txtS1.includes("pourquoi") || txtS1.includes("valeur") || txtS1.includes("qualité") || txtS1.includes("unique")) score += 2;
        if (txtS1.includes("négoc") || txtS1.includes("prix") || txtS1.includes("réduction") || txtS1.includes("promo") || txtS1.includes("offre")) score += 1.5;
        if (txtS1.includes("confiance") || txtS1.includes("plaisir") || txtS1.includes("te faire")) score += 1.5;

        if (txtS2.includes("respect") || txtS2.includes("gentiment") || txtS2.includes("poliment") || txtS2.includes("désolé")) score += 2;
        if (txtS2.includes("autre") || txtS2.includes("proposer") || txtS2.includes("alternative") || txtS2.includes("remplacer")) score += 2;
        if (txtS3.includes("copine") || txtS3.includes("girlfriend") || txtS3.includes("relation") || txtS3.includes("attachement")) score += 2;

        if (txtChatting.includes("fidélis") || txtS3.includes("fidélis") || txtChatting.includes("long terme") || txtS3.includes("long terme")) score += 2;
        if (txtChatting.includes("quotidien") || txtS3.includes("quotidien") || txtChatting.includes("amour") || txtS3.includes("émotion")) score += 2;

        const noteFinale = Math.min(Math.round(score), 20);

        let mention = "❌ À fuir / Non Validé";
        let embedColor = 0xFF0000;
        if (noteFinale >= 10 && noteFinale < 14) { mention = "⚡ Profil Moyen"; embedColor = 0xFFAA00; }
        else if (noteFinale >= 14 && noteFinale < 17) { mention = "💎 Bon Profil / Validé"; embedColor = 0x00FFAA; }
        else if (noteFinale >= 17) { mention = "👑 PROFIL ÉLITE (Top Chatter)"; embedColor = 0xFF00FF; }
        
        if (logChannel) {
            const logEmbed = new EmbedBuilder()
                .setColor(embedColor)
                .setTitle(`📊 RAPPORT D'ÉVALUATION (RECRUTEMENT) : ${interaction.user.tag}`)
                .setDescription(`**Verdict final : ${mention}**`)
                .setThumbnail(interaction.user.displayAvatarURL())
                .addFields({ name: '⭐ Note Automatique', value: `**Note : ${noteFinale}/20**`, inline: false })
                .addFields(embedFields)
                .setFooter({ text: `Spider-Society • ID: ${userId}` })
                .setTimestamp();

            await logChannel.send({ embeds: [logEmbed] });
        }

        tempAnswers.delete(userId);
        
        await interaction.editReply({ 
            content: `✅ **Candidature terminée avec succès !**\nLes résultats ont été envoyés dans le salon de contrôle.\n\n⚠️ **Le salon sera supprimé dans 10 secondes.**` 
        });
        
        setTimeout(() => {
            if (interaction.channel && interaction.channel.deletable) {
                interaction.channel.delete().catch(() => {});
            }
        }, 10000);
    }
});

client.login(process.env.DISCORD_TOKEN);