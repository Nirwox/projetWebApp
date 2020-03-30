class Intervention {
    constructor(id ,userId ,nom, prenom, titre, description, date, status) {
        this.id = id;
        this.userId = userId;
        this.nom = nom;
        this.prenom = prenom;
        this.titre = titre;
        this.description = description;
        this.date = date;
        this.status = status;
    }
    setId(id) {
        this.id = id;
    }
}