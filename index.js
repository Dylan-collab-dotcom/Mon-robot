// 1. IMPORTS DES MODULES (Tous les éléments de discord.js réunis ici)
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

// 2. INITIALISATION UNIQUE DU CLIENT & EXPRESS
const client = new Client({ 
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] 
});

const app = express();
const port = process.env.PORT || 3000;

// Serveur Web de maintien en ligne
app.get('/', (req, res) => {
    res.send('Bot Discord est en ligne !');
});

app.listen(port, () => {
    console.log(`Serveur de maintien en ligne actif sur le port ${port}`);
});

// --- CONFIGURATION DU BOT ---
const LOG_CHANNEL_ID = '1503731703145955359'; 
const WELCOME_CHANNEL_ID = '1502587205611421867';  // Salon #pick-up
const ANNONCE_CHANNEL_ID = '1508005069247741952';  // Salon #enseignement
// ----------------------------

const tempAnswers = new Map();

client.once('ready', () => {
    console.log(`✅ Spider-Bot opérationnel : ${client.user.tag}`);
});

// 3. GESTION DES SALONS TEXTUELS
client.on('messageCreate', async (message) => {
    if (message.author.bot) return;

    // --- SALON #PICK-UP (RECRUTEMENT AUTOMATIQUE) ---
    if (message.channel.id === WELCOME_CHANNEL_ID) {
        await message.delete().catch(() => {});

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
        await message.delete().catch(() => {});

        // EMBED 1 : GESTION DES MÉDIAS
        const embed1 = new EmbedBuilder()
            .setColor(0x00FF00)
            .setTitle('🎓 FORMATION CHATTING — MODULE 1 : BASES & ATTITUDE')
            .setDescription("Règles opérationnelles fondamentales pour maximiser la rentabilité des flux de discussion.")
            .addFields(
                {
                    name: '📸 1. Gestion Tactique des Médias',
                    value: "• **Agression :** Évitez d’être trop agressif avec les médias. Alternez et chauffez les clients entre chaque média envoyé.\n" +
                           "• **Suivi :** Après l'envoi du premier média, utilisez impérativement les messages pré-rédigés.\n" +
                           "• **Format d'envoi :** Les vidéos peuvent être envoyées toutes en même temps, mais **les photos doivent être envoyées une par une**.\n" +
                           "• **Demandes urgentes :** En cas de demande personnalisée d’un client, indiquez-le dans la section \"Demandes urgentes\" sur Discord pour un traitement rapide.\n" +
                           "• **Scripts & Prix :** Un script correspond à des montants de 20, 50, 70, 100 ou 200. Tout est noté dans l’onglet \"Créateur\". Attention : évitez d’envoyer un script de nuit en plein jour !\n" +
                           "• **Accompagnement :** Toujours accompagner les médias d’un beau message séduisant."
                },
                {
                    name: '⚡ 2. Vitesse d\'Exécution & Trafic',
                    value: "• **Navigation :** Ne restez pas uniquement dans la catégorie \"Messages non lus\". Vérifiez constamment la catégorie \"Tous les messages\" pour éviter d’en manquer.\n" +
                           "• **Actualisation :** Actualisez régulièrement pour ne pas rater de nouvelles demandes.\n" +
                           "• **Délai :** Répondez aux clients dans un **délai de 3 à 4 minutes maximum**.\n" +
                           "• **Priorisation :** En cas de trafic élevé, donnez la priorité absolue aux *spenders* (clients dépensiers)."
                },
                {
                    name: '🗣️ 3. Manière de Parler aux Clients',
                    value: "• **Rebondir :** Si vous avez obtenu des informations sur le client, utilisez-les.\n" +
                           "• **Lien émotionnel :** Le client est là pour trouver une \"copine virtuelle\". Posez-lui des questions personnelles.\n" +
                           "• **Ponctuation :** Terminez chaque phrase par un **cœur ❤️**. **Évitez de terminer vos phrases par un point (.)**.\n" +
                           "• **Surnoms :** Appelez toujours les clients par un surnom (par défaut **\"mon chat\"**).\n" +
                           "• **Phrases Engageantes :** Au lieu de *« Tu veux venir avec moi sous la douche ? »*, dites plutôt *« Mon chat, je vais aller me laver, je t’emmène avec moi. »*"
                }
            );

        // EMBED 2 : SCRIPT TUNNEL — PHASE 1
        const embed2 = new EmbedBuilder()
            .setColor(0x00FF00)
            .setTitle('🎓 FORMATION CHATTING — MODULE 2 : SCRIPT TUNNEL (PHASE 1)')
            .addFields(
                {
                    name: '🎯 PHASE 1 — Accroche & Profilage',
                    value: "**Objectif :** Récupérer prénom, âge, ville, job + créer un lien doux/taquin.\n\n" +
                           "**Questions à copier/coller obligatoirement :**\n" +
                           "• *tu t'appelle comment? 👀*\n" +
                           "• *Tu viens d’où ?*\n" +
                           "• *D’ailleurs tu as quel âge ? J’aime bien savoir à qui je parle :))*\n" +
                           "• *Et tu vis où ?*\n" +
                           "• *D’ailleurs tu fais quoi dans la vie ? 🤭*\n" +
                           "• *Tu fais quoi de tes journées en dehors du boulot ?*"
                },
                {
                    name: '📌 Branches Spécifiques selon l\'Âge',
                    value: "• **S'il est plus âgé :** « Ahh c’est stylé j’aime bien les mecs un peu plus âgés... »\n" +
                           "• **S'il est plus jeune (>=18) :** « Haha cool j’aime bien les gars plus jeunes 😋 »"
                },
                {
                    name: '📖 Présentation Perso Storytelling',
                    value: "« Moi je suis étudiante en marketing :) j’essaye de me débrouille comme je peux... »"
                },
                {
                    name: '🛑 Gestion des Demandes IRL / Réseaux Précoces',
                    value: "• **1ère fois :** « Faisons connaissance et puis on verra où le vent nous mène »\n" +
                           "• **2ème fois :** « Franchement, je suis un peu déçue... Je suis sur OnlyFans parce que c’est compliqué financièrement... »\n" +
                           "• **CTA de redirection :** « je te garde avec moi pendant que je me prépare… tu veux voir ? »"
                }
            );

        // EMBED 3 : SCRIPT TUNNEL — PHASE 2 & 3
        const embed3 = new EmbedBuilder()
            .setColor(0x00FF00)
            .setTitle('🎓 FORMATION CHATTING — MODULE 2 : TUNNEL (PHASE 2 & 3)')
            .addFields(
                {
                    name: '🎯 PHASE 2 — Approfondissement & Cadrage',
                    value: "• *Depuis combien de temps tu es sur OF ?*\n• *Tu as une copine en ce moment ?*\n• *C’est quoi ton type de fille ?*"
                },
                {
                    name: '🎯 PHASE 3 — La Question de Qualification Clé',
                    value: "Ouverture obligatoire : *« Bon ok, j’ai une question à te poser... qu’est-ce qui t’a vraiment ramené ici ? »*\n" +
                           "• **A) LES SEINS :** ➔ CTA: « je t’envoie un petit aperçu privé ? »\n" +
                           "• **B) TON CUL :** ➔ CTA: « tu veux la vue arrière maintenant ? »\n" +
                           "• **C) JUSTE POUR PARLER :** « tu crois que tu pourrais me faire passer mon ennui ? »"
                },
                {
                    name: '⚡ RÈGLES D’OR INVIOLABLES DES CHATTEURS',
                    value: "• **Chaque abonné vaut de l’or 💰**\n• **Ne jamais virer un abo 🚫**\n• **Discipline = Cash**"
                }
            );

        // EMBED 4 : GESTION DES OBJECTIONS
        const embed4 = new EmbedBuilder()
            .setColor(0x00FF00)
            .setTitle('🎓 FORMATION CHATTING — MODULE 3 : TRAITEMENT DES OBJECTIONS')
            .setDescription("Une objection est une barrière psychologique. Votre mission : **Reconnaître** puis **Escalader** sexuellement.")
            .addFields(
                { name: '❌ L\'objection universelle : « Je n’ai pas d’argent. »', value: "Le secret réside dans l'analyse immédiate de la situation parmi les 4 cas de figure réels." },
                { name: '🔍 Cas 1 & Cas 2 : Texte ou Fin de Plaisir', value: "**• Cas 1 (Copywriting) :** Décrivez la scène de manière immersive.\n**• Cas 2 (Déjà joui) :** Posez la question cash, passez en aftercare bienveillant." },
                { name: '🔍 Cas 3 & Cas 4 : Concurrence ou Blocage Réel', value: "**• Cas 3 (Autre créatrice) :** Donnez plus de valeur relationnelle.\n**• Cas 4 (Pas d'argent) :** Proposez une offre flash au budget restant." }
            );

        // EMBED 5 : EXEMPLES DE SCRIPT REELS
        const embed5 = new EmbedBuilder()
            .setColor(0x00FF00)
            .setTitle('🎓 FORMATION CHATTING — MODULE 3 : ANALYSE DE CAS RÉELS')
            .addFields(
                { name: '🎭 Situation Pratique 1 (Prix de $60)', value: "• *Fan :* « j’aimerais trop te baiser... »\n• *Réponse Élite :* Projetez-le directement dans le fantasme du média payant sans mentionner le blocage du prix." },
                { name: '🎭 Situation Pratique 2 (Hésitation finale)', value: "• *Fan :* « bébé t’es trop sexy je crois que je vais devoir débloquer ça »\n• *Réponse Élite :* Intensification sexuelle massive et création de FOMO." }
            );

        // EMBED 6 : LE CHOUINAGE COMMERCIAL & CLOSING
        const embed6 = new EmbedBuilder()
            .setColor(0x00FF00)
            .setTitle('🎓 FORMATION CHATTING — MODULE 4 : CLOSING ÉLITE & COPYWRITING')
            .addFields(
                { name: '👑 Masterclass : Le Chouinage Commercial', value: "Utiliser une fragilité contrôlée (instinct de sauveur).\nStructure : Moment dur ➔ Valorisation ➔ Tendresse ➔ Ouverture payante." },
                { name: '🚫 Méthode A-Player : Closer sans mentionner d\'argent', value: "Étape 1 : Brèche émotionnelle.\nÉtape 2 : Vidéo selfie douce explicative." },
                { name: '✍️ Les 3 Lois Secrètes du Copywriting Agency', value: "• **Loi 1 :** Parlez d'envie, pas de prix.\n• **Loi 2 :** Parlez d'un moment partagé, pas d'un fichier numérique.\n• **Loi 3 :** Créez une attente insoutenable." }
            );

        // EMBED 7 : MÉTHODE KYC (PARTIE 1)
        const embed7 = new EmbedBuilder()
            .setColor(0x00FF00)
            .setTitle('🎓 MODULE 5 : MÉTHODE KYC (CONNAISSANCE CLIENT)')
            .setDescription("Un fan connu est un fan qui paye. Ne soyez pas des bots.")
            .addFields( 
                { name: '🔍 Observer avant de parler', value: "Vérifiez anciennes conversations, achats, likes et heures d'activité pour éviter de poser des questions doublons." },
                { name: '💬 Démarrer avec une question simple', value: "Commencez naturellement : « Comment se passe ta journée ? », pour découvrir sa routine." },
                { name: '🛠️ Creuser progressivement', value: "Rebondissez sur sa réponse pour discrètement obtenir son job, ses horaires et sa routine." }
            )
            .setFooter({ text: 'Spider-Society • Page 1/2' });

        // EMBED 8 : MÉTHODE KYC (PARTIE 2)
        const embed8 = new EmbedBuilder()
            .setColor(0x00FF00)
            .setTitle('🎓 MÉTHODE KYC – MARCHE À SUIVRE POUR LES CHATTEURS (2/2)')
            .addFields(
                { name: '❤️ Découvrir sa vie personnelle', value: "Posez des questions sur sa situation amoureuse, ses hobbies ou son style de vie." },
                { name: '🎯 Identifier ses préférences', value: "Comprenez son format d'achat favori : préfère-t-il les photos ou les vidéos ?" },
                { name: '💾 Noter les infos importantes', value: "Chaque information doit être impérativement enregistrée dans sa fiche note (Fan Note)." }
            )
            .setFooter({ text: 'Spider-Society • Discipline = Cash 🔑' });

        // Envois groupés par lots (limite globale de Discord respectée)
        await message.channel.send({ embeds: [embed1, embed2, embed3] });
        await message.channel.send({ embeds: [embed4, embed5, embed6] });
        await message.channel.send({ embeds: [embed7, embed8] });
    }
});

// 4. GESTION DU FLUX DES INTERACTIONS (RECRUTEMENT)
client.on('interactionCreate', async (interaction) => {
    const userId = interaction.user.id;
    const { guild, user } = interaction;

    // --- BOUTON RECRUTEMENT (#PICK-UP) ---
    if (interaction.isButton() && interaction.customId === 'open_ticket') {
        try {
            const existingChannel = guild.channels.cache.find(c => c.name === `recrutement-de-${user.displayName.toLowerCase().replace(/\s+/g, '-')}`);
            if (existingChannel) {
                return await interaction.reply({ content: `⚠️ Tu as déjà un salon ouvert ici : ${existingChannel}`, flags: [64] });
            }

            const channel = await guild.channels.create({
                name: `recrutement-de-${user.displayName.toLowerCase().replace(/\s+/g, '-')}`,
                type: ChannelType.GuildText,
                permissionOverwrites: [
                    { id: guild.roles.everyone, deny: [PermissionFlagsBits.ViewChannel] },
                    { id: user.id, allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages, PermissionFlagsBits.ReadMessageHistory] }
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
                content: `${user}`, 
                embeds: [new EmbedBuilder().setColor(0xFF0000).setTitle('🎯 Candidature').setDescription("Sélectionne le poste ci-dessous pour commencer.")], 
                components: [menu] 
            });
            await interaction.reply({ content: `✅ Salon créé : ${channel}`, flags: [64] });
        } catch (e) { console.error(e); }
    }

    // --- ÉTAPES MODALS ET SÉLECTION RECRUTEMENT ---
    if (interaction.isStringSelectMenu() && interaction.customId === 'select_poste') {
        const modal = new ModalBuilder().setCustomId('modal_infos').setTitle(`📝 Infos Personnelles (1/3)`);
        modal.addComponents(
            new ActionRowBuilder().addComponents(new TextInputBuilder().setCustomId('q1').setLabel("Nom et âge").setPlaceholder("Ex: Thomas, 25 ans").setStyle(TextInputStyle.Short).setRequired(true)),
            new ActionRowBuilder().addComponents(new TextInputBuilder().setCustomId('q2').setLabel("Origine et sexe").setPlaceholder("Ex: France, Homme").setStyle(TextInputStyle.Short).setRequired(true)),
            new ActionRowBuilder().addComponents(new TextInputBuilder().setCustomId('q3').setLabel("Expérience (OF)").setPlaceholder("Détaille tes expériences passées...").setStyle(TextInputStyle.Paragraph).setRequired(true)),
            new ActionRowBuilder().addComponents(new TextInputBuilder().setCustomId('q4').setLabel("Langues maîtrisées").setPlaceholder("Ex: Français, Anglais").setStyle(TextInputStyle.Short).setRequired(true)),
            new ActionRowBuilder().addComponents(new TextInputBuilder().setCustomId('q5').setLabel("Jours de travail").setPlaceholder("Ex: 6/7 ou Lundi au Samedi").setStyle(TextInputStyle.Short).setRequired(true))
        );
        await interaction.showModal(modal);
    }

    if (interaction.isModalSubmit() && interaction.customId === 'modal_infos') {
        const data = tempAnswers.get(userId) || {};
        data.infos = {
            nom: interaction.fields.getTextInputValue('q1'),
            origine: interaction.fields.getTextInputValue('q2'),
            exp: interaction.fields.getTextInputValue('q3'),
            langues: interaction.fields.getTextInputValue('q4'),
            jours: interaction.fields.getTextInputValue('q5')
        };
        tempAnswers.set(userId, data);
        const row = new ActionRowBuilder().addComponents(new ButtonBuilder().setCustomId('open_p2').setLabel('🎯 Étape Suivante (Compétences)').setStyle(ButtonStyle.Success));
        await interaction.reply({ content: "✅ Infos enregistrées ! Passons aux questions de compétences.", components: [row], flags: [64] });
    }

    if (interaction.isButton() && interaction.customId === 'open_p2') {
        if (!tempAnswers.has(userId)) return await interaction.reply({ content: "❌ Session introuvable, veuillez réouvrir un ticket.", flags: [64] });
        const modal = new ModalBuilder().setCustomId('modal_comp').setTitle(`Test de Compétences (2/3)`);
        modal.addComponents(
            new ActionRowBuilder().addComponents(new TextInputBuilder().setCustomId('c1').setLabel("Comb de conv.tu gère en même temps ?").setPlaceholder("Ex: 5-8 conversations").setStyle(TextInputStyle.Short).setRequired(true)),
            new ActionRowBuilder().addComponents(new TextInputBuilder().setCustomId('c2').setLabel("C'est quoi le chatting ?").setPlaceholder("Donne ta vision (lien, fidélisation, vente)...").setStyle(TextInputStyle.Paragraph).setRequired(true)),
            new ActionRowBuilder().addComponents(new TextInputBuilder().setCustomId('c3').setLabel("Le KYC c'est quoi ?").setPlaceholder("Définition, ce que ça représente pour toi et son importance.").setStyle(TextInputStyle.Paragraph).setRequired(true)),
            new ActionRowBuilder().addComponents(new TextInputBuilder().setCustomId('c4').setLabel("Quoi faire attention chatting ?").setPlaceholder("Orthographe, réactivité, empathie").setStyle(TextInputStyle.Short).setRequired(true))
        );
        await interaction.showModal(modal);
    }

    if (interaction.isModalSubmit() && interaction.customId === 'modal_comp') {
        const data = tempAnswers.get(userId);
        if (!data) return;
        data.comp = {
            conv: interaction.fields.getTextInputValue('c1'),
            chatting: interaction.fields.getTextInputValue('c2'),
            kyc: interaction.fields.getTextInputValue('c3'),
            attention: interaction.fields.getTextInputValue('c4')
        };
        tempAnswers.set(userId, data);
        const row = new ActionRowBuilder().addComponents(new ButtonBuilder().setCustomId('open_p3').setLabel('✍️ Étape Suivante (Scénarios)').setStyle(ButtonStyle.Success));
        await interaction.reply({ content: "✅ Compétences validées ! Place aux scénarios de chat.", components: [row], flags: [64] });
    }

    if (interaction.isButton() && interaction.customId === 'open_p3') {
        if (!tempAnswers.has(userId)) return await interaction.reply({ content: "❌ Session introuvable, veuillez réouvrir un ticket.", flags: [64] });
        const modal = new ModalBuilder().setCustomId('modal_scen').setTitle(`Scénarios de Chat (3/3)`);
        modal.addComponents(
            new ActionRowBuilder().addComponents(new TextInputBuilder().setCustomId('s1').setLabel("Scénario 1 : Ventes").setPlaceholder("L'abonné dit : 'je ne suis pas sûr de payer c'est trop chère'. Comment réponds-tu ?").setStyle(TextInputStyle.Paragraph).setRequired(true)),
            new ActionRowBuilder().addComponents(new TextInputBuilder().setCustomId('s2').setLabel("Scénario 2 : Contenu").setPlaceholder("Le sub dmd un média que la modèle ne peut pas faire. Comment réponds-tu ?").setStyle(TextInputStyle.Paragraph).setRequired(true)),
            new ActionRowBuilder().addComponents(new TextInputBuilder().setCustomId('s3').setLabel("Scénario 3 : Terme GFE").setPlaceholder("Explique ce que ça représente pour toi et son importance.").setStyle(TextInputStyle.Paragraph).setRequired(true))
        );
        await interaction.showModal(modal);
    }

    // --- SOUMISSION FINALE ET ANALYSE AUTOMATIQUE ---
    if (interaction.isModalSubmit() && interaction.customId === 'modal_scen') {
        await interaction.deferReply();
        const data = tempAnswers.get(userId);
        
        // Sécurité pour éviter les plantages si la session est vide
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

        // --- CALCUL DU SCORE ---
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
        if (noteFinale >= 14 && noteFinale < 17) { mention = "💎 Bon Profil / Validé"; embedColor = 0x00FFAA; }
        if (noteFinale >= 17) { mention = "👑 PROFIL ÉLITE (Top Chatter)"; embedColor = 0xFF00FF; }
        
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
        await interaction.editReply({ content: `✅ **Candidature terminée avec succès !**\nLes résultats ont été envoyés dans le salon de contrôle.\n\n⚠️ **Le salon sera supprimé dans 10 secondes.**` });
        
        // Le global setTimeout fonctionne de base en Node.js, pas besoin d'import supplémentaire
        setTimeout(() => {
            interaction.channel.delete().catch(() => {});
        }, 10000);
    }
});

client.login(process.env.DISCORD_TOKEN);