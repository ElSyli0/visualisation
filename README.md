# infovis - IDASM103

Application Web pour le projet de Visualisation de l'Information

## Explications pour lancer un serveur local via Flask (Python)
### Sous Linux
---
1) Ouvrez le terminal dans le dossier contenant le code source
2) Créez un espace virtuel pour python (afin de ne pas influencer votre distribution python habituelle)
````
sudo apt-get install virtualenv
virtualenv -p python3 venv
````
3) Activez votre espace virtuel pour y faire des modifications
```
source venv/bin/activate
```
4) Assurez-vous d'être dans le dossier contenant le code source de l'application
5) Installez les librairies nécessaires pour utiliser Flask (elles seront uniquement installées dans venv)
```
pip3 install -r requirements.txt
```
6) Préparez et lancez Flask en écrivant dans le terminal
```
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
