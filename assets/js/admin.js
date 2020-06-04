//Elementos del DOM;
const $listado = document.querySelector('#listado');
const $form_field_name = document.querySelector('#form_field_name');
const $form_field_veg = document.querySelector('#form_field_veg');
const $form_field_type = document.querySelector('#form_field_type');
const $form_field_description = document.querySelector('#form_field_description');
const $form_field_lat = document.querySelector('#form_field_lat');
const $form_field_lng = document.querySelector('#form_field_lng');
const $form_field_number = document.querySelector('#form_field_number');
const $form_field_redes = document.querySelector('#form_field_redes');
const $form_field_horarioAtencion = document.querySelector('#form_field_horarioAtencion');
const $form_field_delivery = document.querySelector('#form_field_delivery');
const $form_field_id = document.querySelector('#form_field_id');
const $form_main = document.querySelector('#form_main');
const $add_button = document.querySelector('.handleAdd');

//READ;
const getTiendas = async (id = "") => {
    const result = await api.getTiendas();
    console.log(result);
    if (id == "") { //Cuando la llama el document ready;
        // va eliminando uno por uno si encuentra un elemento 'hijo' de $listado;
        while($listado.firstChild){
            $listado.removeChild($listado.firstChild);
        }
        result.forEach(element => {
            $listado.innerHTML += dataRow(element)
        });

        //Nuevos EventListeners para incluir los nuevos elementos del DOM;
        const $btnsDelete = document.querySelectorAll('.handleDelete');
        $btnsDelete.forEach(element => {
            element.addEventListener('click', handleClickDelete)
        });
        const $btnsEdit = document.querySelectorAll('.handleEdit');
        $btnsEdit.forEach(element => {
            element.addEventListener('click', handleClickEdit)
        });

    } else { //Cuando la llamo con un id desde Editar. Para hacer una busqueda por id;
        const elementById = result.find((el) => id == el._id);
        return elementById;
    }
}

const dataRow = props => {
    const { _id, lat, lng, name, veg, type, description, number, horarioAtencion, delivery, redes } = props
    return `
        <div class="item">
            <div class="listado_content">
                <h2 class="dashboardElements">${name}</h2>
            </div>

            <div class="btns_wrapper">
                <a href="#" data-id="${_id}" class="btn verde handleEdit">Editar</a>
                <a href="#" data-id="${_id}" class="btn rojo handleDelete">Eliminar</a>
            </div>
        </div>
    `

}

getTiendas(); //Llamo a la funcion cuando carga la pag;

//CRUD;

//DELETE;
const deleteTienda = async (id) => {
    const result = await api.deleteTiendas(id);
    console.log('Deleted', result);
    getTiendas();
}
const handleClickDelete = async () => {
    const id = event.target.dataset.id;
    deleteTienda(id);
}

//UPDATE;
const updateTienda = async (data,id) => {
    const result = await api.updateTiendas(data,id);
    console.log('Updated', result)
    getTiendas();
}
const handleClickEdit = async () => {
    const id = event.target.dataset.id;
    const reg = await getTiendas(id);
    $form_main.classList.add("active");
    completeForm(reg);
}
const completeForm = (reg) => {
    const {_id, lat, lng, name, veg, type, description, number, horarioAtencion, delivery, redes } = reg;
    $form_field_id.value= _id;
    $form_field_lat.value = lat;
    $form_field_lng.value = lng;
    $form_field_name.value = name;
    $form_field_veg.value = veg;
    $form_field_type.value = type; 
    $form_field_description.value = description;
    $form_field_number.value = number;
    $form_field_horarioAtencion.value = horarioAtencion;
    $form_field_delivery.value = delivery;
    $form_field_redes.value = redes;
}

//CREATE;
/*en update pasaba el id, para create la url no necesita id, entonces solo pasa formData y va a ser el objeto que va a tomar como body.*/
const createTienda = async (data) => {
    const result = await api.createTienda(data);
    console.log('Created', result);
    getTiendas();
}

const handleClickAdd = (event) => {
    event.preventDefault();
    $form_field_id.value = '';
    $form_main.reset();
    $form_main.classList.add("active");
    $form_field_name.focus();
}

$add_button.addEventListener('click', handleClickAdd);

//FORM (Update o Create);
$form_main.addEventListener('submit', (event) => {
    event.preventDefault();
    const id = $form_field_id.value;
    const formData =  {
        "lat": $form_field_lat.value,
        "lng": $form_field_lng.value,
        "name": $form_field_name.value,
        "veg": $form_field_veg.value,
        "type": $form_field_type.value,
        "description": $form_field_description.value,
        "number": $form_field_number.value,
        "horarioAtencion": $form_field_horarioAtencion.value,
        "delivery": $form_field_delivery.value,
        "redes": $form_field_redes.value
    }
    $form_main.classList.remove("active");
    console.log("Mi ID es ", id);
    if ( id === '') {
        createTienda(formData);
    } else {
        updateTienda(formData,id);
    }

    //Reseteo el form;
    $form_field_id.value = '';
    $form_main.reset();
    
});