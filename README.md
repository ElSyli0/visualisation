# infovis

Application Web pour le projet de Visualisation de l'Information

## Explication pour lancer serveur local via Flask
### Sous Linux
---
1) ouvrir le terminal dans le dossier GitHub
2) Créer un espace virtuel pour python (afin de ne pas influencer votre distribution python habituelle)
````
sudo apt-get install virtualenv
virtualenv -p python3 venv
````
3) Activer votre espace virtuel pour y faire des modifications
```
source venv/bin/activate
```
4) Aller dans le dossier visualisation (avec la commande cd du terminal)
5) Installer les librairies nécessaires pour utiliser Flask (elles seront uniquement installées dans venv)
```
pip3 install -r requirements.txt
```
6) Préparer et lancer Flask en tappant dans le terminal
```
export FLASK_DEBUG=1
export FLASK_APP=flask_engine.py
flask run
```
7) Si tout va bien, ouvrez un moteur de recherche quelconque et taper dans la barre de recherche pour afficher le site web
```
localhost:5000
```
8) Une fois que vous voulez quitter l'espace virtuel :
```
deactivate
```
NB : flask se lancera uniquement depuis l'espace virtuel venv !!!
### Sous Windows
---
