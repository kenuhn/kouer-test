Vue d'ensemble

Ce projet est une mini application de e-commerce construite en utilisant React et TypeScript, suivant les principes de l'Architecture Clean. L'application permet aux utilisateurs de s'inscrire, de se connecter, de naviguer dans une boutique de produits et d'ajouter des produits à leur panier. Le projet n'utilise pas Redux car il est conçu pour être un projet à petite échelle.
Fonctionnalités

    Authentification des utilisateurs (Inscription et Connexion)
    Liste de produits
    Ajouter des produits au panier
    Données fictives pour les tests

Structure du projet

Le projet est organisé selon les principes de l'Architecture Clean, ce qui aide à maintenir une séparation des préoccupations et rend la base de code plus modulaire et plus facile à tester.
Dossiers

    Domain: Contient la logique métier principale et les entités du domaine.
    Application: Contient les cas d'utilisation qui orchestrent l'application de la logique métier.
    Infrastructure: Contient les implémentations spécifiques de la technologie, comme les appels API.
    Presentation: Contient les composants React et la logique de présentation.
    Mock-db: Contient des données fictives pour les tests et le développement local.

Fichiers clés

    db.json: Contient les données fictives de test.
    userService.ts: Contient les fonctions pour gérer les utilisateurs, telles que l'inscription et la connexion.
    ProductContext.tsx: Contient le contexte pour gérer les produits et le panier.
    RegisterForm.tsx: Composant de formulaire d'inscription.
    Slider.tsx: Composant de slider de produits.

Installation et Lancement du Projet
Prérequis

    Node.js (version 14 ou supérieure)
    npm ou yarn

Étapes

    Clonez le dépôt :

bash

git clone https://github.com/votre-utilisateur/votre-repo.git
cd votre-repo

    Installez les dépendances :

bash

npm install

ou

bash

yarn install

    Lancez le projet avec Vite :

bash

npm run dev

ou

bash

yarn dev

    Ouvrez votre navigateur et allez à l'adresse :

arduino

http://localhost:3000
