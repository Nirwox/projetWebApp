lesInterv = [];
objectSelected = null;
$(document).ready( function () {
    $("#formAdd").hide();

    initData();
    reloadTable(lesInterv);
    $('#myTable').DataTable();

    $('#addInter').click(function() {
        $("#formAdd").show();
        $("#myTable_wrapper").hide();
    });

    $('#home').click(function() {
        $("#formAdd").hide();
        $("#myTable_wrapper").show();
    });

    $('#newInter').click(function() {
        var laDate = new Date();
        var lInter = [];
        var titre = $('#titre').val();
        var desc = $('#desc').val();
        var dateFormat = laDate.getDate() + '/' + laDate.getMonth() + '/' + laDate.getFullYear();
        var row = new Intervention(idAleatoire(laDate), 'U00I876', 'Louvet', 'Hugo', titre, desc, dateFormat,'Non assigné');

        $('#myTable').DataTable().row.add([
            row.id,
            row.userId,
            row.titre,
            row.date,
            row.status,
            '<i class="fas fa-plus-circle">'
        ] ).draw( false );

        $("#formAdd").hide();
        $("#myTable_wrapper").show();

        var titre = $('#titre').val('');
        var desc = $('#desc').val('');

    })

    $('#deleteDemande').click(function() {
        alert(objectSelected.id)
        var lignes = document.getElementById('lesLignes').childNodes;
        for(var i=1;i<lignes.length;i++) {
            //console.log(lignes[i].childNodes)
            if(lignes[i].childNodes[0].innerHTML == objectSelected.id) {
                console.log(lignes[i])
                //document.getElementById('lesLignes').removeChild(lignes[i])
                $('#myTable').DataTable().row(lignes[i]).remove().draw();
            }
        }
    });
});

function idAleatoire(date) {
    var str = "TICKET-"+ date.getTime();
    return str;
}

function viewDetail(idInter) {
    objectSelected = idInter;
    lesInterv.forEach(element => {
        if(element.id == idInter) {
            objectSelected = element;
        }
    });
    document.getElementById('exampleModalLabel').innerHTML = objectSelected.titre
    $('#inputId').val(objectSelected.id);
    $('#inputIdUser').val(objectSelected.userId);
    $('#inputNom').val(objectSelected.nom);
    $('#inputPrenom').val(objectSelected.prenom);
    $('#inputDesc').val(objectSelected.description);
    $('#inputState').val(objectSelected.status);
    $('#inputDate').val(objectSelected.date);

    $('#exampleModal').modal('show')
}

function reloadTable(lesInterv) {
    var lesLignes = document.getElementById('lesLignes');
    lesInterv.forEach(oneIntervention => {
        var newLigne = document.createElement('tr');

        var newCellNom = document.createElement('td');
        newCellNom.innerHTML = oneIntervention.id;
    
        var newCellPrenom = document.createElement('td');
        newCellPrenom.innerHTML = oneIntervention.userId;
    
        var newCellTitre = document.createElement('td');
        newCellTitre.innerHTML = oneIntervention.titre;

        var newCellDate = document.createElement('td');
        newCellDate.innerHTML = oneIntervention.date;
    
        var newCellstatus = document.createElement('td');
        newCellstatus.innerHTML = oneIntervention.status;
        if(oneIntervention.status == 'Terminée') {
            newCellstatus.classList.add('bg-success')
            newCellstatus.classList.add('text-white')
        } else if(oneIntervention.status == 'Assigné') {
            newCellstatus.classList.add('bg-warning')
            newCellstatus.classList.add('text-white')
        } else if(oneIntervention.status == 'Non assigné') {
            newCellstatus.classList.add('bg-danger')
            newCellstatus.classList.add('text-white')
        }

        var newCellAction = document.createElement('td');
        newCellAction.setAttribute('onclick','viewDetail("'+oneIntervention.id+'")')
        newCellAction.classList.add('text-center')
        newCellAction.innerHTML = "<i class='fas fa-plus-circle'>";
    
        newLigne.appendChild(newCellNom);
        newLigne.appendChild(newCellPrenom);
        newLigne.appendChild(newCellTitre);
        newLigne.appendChild(newCellDate);
        newLigne.appendChild(newCellstatus);
        newLigne.appendChild(newCellAction);
    
        lesLignes.appendChild(newLigne)
    });
}

function initData() {
    var firstDate = new Date('2020,3,30');
    var dateFormat = firstDate.getDate() + '/' + firstDate.getMonth() + '/' + firstDate.getFullYear();
    var row = new Intervention(idAleatoire(firstDate), 'U00I876', 'Louvet', 'Hugo', 'Comment héberger plusieurs sites web sur un même hébergement mutualisé ?', 'Comment héberger plusieurs sites web sur un même hébergement mutualisé ?', dateFormat,'Non assigné');
    
    var firstDate = new Date('2020,3,31');
    var dateFormat = firstDate.getDate() + '/' + firstDate.getMonth() + '/' + firstDate.getFullYear();
    var row2 = new Intervention(idAleatoire(firstDate), 'U00I876', 'Louvet', 'Hugo', 'Comment créer un site web ?', 'Comment créer un site web ?',dateFormat,'Assigné');

    var firstDate = new Date('2020,4,1');
    var dateFormat = firstDate.getDate() + '/' + firstDate.getMonth() + '/' + firstDate.getFullYear();
    var row3 = new Intervention(idAleatoire(firstDate), 'U00I876', 'Louvet', 'Hugo', 'Comment se connecter sur mon hébergement en FTP ?', 'Comment se connecter sur mon hébergement en FTP ?', dateFormat,'Non assigné');

    var firstDate = new Date('2020,3,23');
    var dateFormat = firstDate.getDate() + '/' + firstDate.getMonth() + '/' + firstDate.getFullYear();
    var row4 = new Intervention(idAleatoire(firstDate), 'U00I876', 'Louvet', 'Hugo', 'Comment activer hébergement gratuit Start 10M ?', 'Comment activer hébergement gratuit Start 10M ?', dateFormat,'Terminée');

    var firstDate = new Date('2020,3,5');
    var dateFormat = firstDate.getDate() + '/' + firstDate.getMonth() + '/' + firstDate.getFullYear();
    var row5 = new Intervention(idAleatoire(firstDate), 'U00I876', 'Louvet', 'Hugo', 'Je ne trouve pas les identifiants de ma base de données', 'Je ne trouve pas les identifiants de ma base de données', dateFormat,'Assigné');

    var firstDate = new Date('2020,3,7');
    var dateFormat = firstDate.getDate() + '/' + firstDate.getMonth() + '/' + firstDate.getFullYear();
    var row6 = new Intervention(idAleatoire(firstDate), 'U00I876', 'Louvet', 'Hugo', 'Que faire en cas de problème FTP ?', 'Que faire en cas de problème FTP ?', dateFormat,'Assigné');

    var firstDate = new Date('2020,3,19');
    var dateFormat = firstDate.getDate() + '/' + firstDate.getMonth() + '/' + firstDate.getFullYear();
    var row7 = new Intervention(idAleatoire(firstDate), 'U00I876', 'Louvet', 'Hugo', 'Comment voir les statistiques de mon site?', 'Comment voir les statistiques de mon site?', dateFormat,'Non assigné');

    var firstDate = new Date('2020,3,22');
    var row8 = new Intervention(idAleatoire(firstDate), 'U00I876', 'Louvet', 'Hugo', 'Que signifie erreur suivante ?', 'Que signifie erreur suivante ?', dateFormat,'Non assigné');

    lesInterv.push(row)
    lesInterv.push(row2)
    lesInterv.push(row3)
    lesInterv.push(row4)
    lesInterv.push(row5)
    lesInterv.push(row6)
    lesInterv.push(row7)
    lesInterv.push(row8)
}

