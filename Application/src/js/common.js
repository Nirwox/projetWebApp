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

    $('#updateDemande').click(function() {
        var laRow = document.getElementById(objectSelected.id)

        objectSelected.status = $('#inputState').val();
        objectSelected.titre = $('#inputTitre').val();
        objectSelected.description = $('#inputDesc').val();

        lesCellules = laRow.childNodes;
        console.log(lesCellules)


        $('#myTable').DataTable().row(laRow).data([
            objectSelected.id,
            objectSelected.userId,
            objectSelected.titre,
            objectSelected.date,
            objectSelected.status,
            '<i class="fas fa-plus-circle">'
        ]).node().id = objectSelected.id;
        $('#myTable').DataTable().draw( false );

        lesCellules[4].className = ''

        if(objectSelected.status == 'Terminée') {
            lesCellules[4].classList.add('bg-success')
            lesCellules[4].classList.add('text-white')
        } else if(objectSelected.status == 'Assigné') {
            lesCellules[4].classList.add('bg-warning')
            lesCellules[4].classList.add('text-white')
        } else if(objectSelected.status == 'Non assigné') {
            lesCellules[4].classList.add('bg-danger')
            lesCellules[4].classList.add('text-white')
        }

        $.toast({
            heading: 'Succès',
            text: 'Les modifications ont bien été prises en compte',
            showHideTransition: 'slide',
            position: 'top-right',
            icon: 'success'
        })

        $('#exampleModal').modal('hide');
    })

    $('#newInter').click(function() {
        var laDate = new Date();

        var titre = $('#titre').val();
        var desc = $('#desc').val();
        var prenom = $('#prenom').val();
        var nom = $('#nom').val();

        var idUser = 'U00I';
        var numberAleaoire  = getRandomInt(1000);
        if(numberAleaoire.toString().length == 1) {
            idUser += '00'+numberAleaoire;
        } else if(numberAleaoire.toString().length == 2) {
            idUser += '0'+numberAleaoire;
        } else {
            idUser += numberAleaoire;
        }

        var dateFormat = laDate.getDate() + '/' + laDate.getMonth() + '/' + laDate.getFullYear();
        var row = new Intervention(idAleatoire(laDate), idUser, nom, prenom, titre, desc, dateFormat,'Non assigné');
        lesInterv.push(row)

        $('#myTable').DataTable().row.add([
            row.id,
            row.userId,
            row.titre,
            row.date,
            row.status,
            '<i class="fas fa-plus-circle">'
        ] ).node().id = row.id;
        $('#myTable').DataTable().draw( false );

        $("#formAdd").hide();
        $("#myTable_wrapper").show();

        $.toast({
            heading: 'Succès',
            text: 'Votre ticket à bien été crée',
            showHideTransition: 'slide',
            position: 'top-right',
            icon: 'success'
        })

        

        var laLigne = document.getElementById(row.id);
        var lesCellules = laLigne.childNodes;
        if(lesCellules[4].innerHTML == 'Terminée') {
            lesCellules[4].classList.add('bg-success')
            lesCellules[4].classList.add('text-white')
        } else if(lesCellules[4].innerHTML == 'Assigné') {
            lesCellules[4].classList.add('bg-warning')
            lesCellules[4].classList.add('text-white')
        } else if(lesCellules[4].innerHTML == 'Non assigné') {
            lesCellules[4].classList.add('bg-danger')
            lesCellules[4].classList.add('text-white')
        }

        lesCellules[5].classList.add('text-center')
        lesCellules[5].setAttribute('onclick','viewDetail("'+row.id+'")')

        var titre = $('#titre').val('');
        var desc = $('#desc').val('');
        var prenom = $('#prenom').val('');
        var nom = $('#nom').val('');

    })

    $("#desc").keypress(function() {
        var nbCarac = $(this).val().length;
        var dif = 500 - nbCarac;
        document.getElementById('textArea').innerHTML =  'Caractères restant : '+ dif +'/500';
    });

    $('#deleteDemande').click(function() {
        var lignes = document.getElementById('lesLignes').childNodes;
        for(var i=1;i<lignes.length;i++) {
            //console.log(lignes[i].childNodes)
            if(lignes[i].childNodes[0].innerHTML == objectSelected.id) {
                console.log(lignes[i])
                //document.getElementById('lesLignes').removeChild(lignes[i])
                $('#myTable').DataTable().row(lignes[i]).remove().draw();
                $.toast({
                    heading: 'Succès',
                    text: 'Le ticket a bien été supprimé',
                    showHideTransition: 'slide',
                    position: 'top-right',
                    icon: 'success'
                })
                $('#exampleModal').modal('hide');
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
    $('#inputTitre').val(objectSelected.titre);
    $('#inputDesc').val(objectSelected.description);
    $('#inputState').val(objectSelected.status);
    $('#inputDate').val(objectSelected.date);

    $('#exampleModal').modal('show')
}

function reloadTable(lesInterv) {
    var lesLignes = document.getElementById('lesLignes');
    lesInterv.forEach(oneIntervention => {
        var newLigne = document.createElement('tr');
        newLigne.setAttribute('id',oneIntervention.id)

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
    var row = new Intervention(idAleatoire(firstDate), 'U00I876', 'Louvet', 'Hugo', 'Bug lors de l\'édition d\'une facture', 'Alios autem dicere aiunt multo etiam inhumanius (quem locum breviter paulo ante perstrinxi) praesidii adiumentique causa, non benevolentiae neque caritatis, amicitias esse expetendas; itaque, ut quisque minimum firmitatis haberet minimumque virium, ita amicitias appetere maxime; ex eo fieri ut mulierculae magis amicitiarum praesidia quaerant quam viri et inopes quam opulenti et calamitosi quam ii qui putentur beati.', dateFormat,'Non assigné');
    
    var firstDate = new Date('2020,3,31');
    var dateFormat = firstDate.getDate() + '/' + firstDate.getMonth() + '/' + firstDate.getFullYear();
    var row2 = new Intervention(idAleatoire(firstDate), 'U00I057', 'Canario', 'Christopher', 'Message erreur de réseaux', 'Alios autem dicere aiunt multo etiam inhumanius (quem locum breviter paulo ante perstrinxi) praesidii adiumentique causa, non benevolentiae neque caritatis, amicitias esse expetendas; itaque, ut quisque minimum firmitatis haberet minimumque virium, ita amicitias appetere maxime; ex eo fieri ut mulierculae magis amicitiarum praesidia quaerant quam viri et inopes quam opulenti et calamitosi quam ii qui putentur beati.',dateFormat,'Assigné');

    var firstDate = new Date('2020,4,1');
    var dateFormat = firstDate.getDate() + '/' + firstDate.getMonth() + '/' + firstDate.getFullYear();
    var row3 = new Intervention(idAleatoire(firstDate), 'U00I784', 'Lucas', 'Lewis', 'Impossible d\'actualiser les données clients', 'Alios autem dicere aiunt multo etiam inhumanius (quem locum breviter paulo ante perstrinxi) praesidii adiumentique causa, non benevolentiae neque caritatis, amicitias esse expetendas; itaque, ut quisque minimum firmitatis haberet minimumque virium, ita amicitias appetere maxime; ex eo fieri ut mulierculae magis amicitiarum praesidia quaerant quam viri et inopes quam opulenti et calamitosi quam ii qui putentur beati.', dateFormat,'Terminée');

    lesInterv.push(row,row2,row3)
}
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

