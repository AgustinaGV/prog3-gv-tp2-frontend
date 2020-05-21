//logica del dashboard;

const $listado = document.querySelector('#listado');
const $form_field_lat = document.querySelector('#form_field_lat');
const $form_field_lng = document.querySelector('#form_field_lng');
const $form_field_name = document.querySelector('#form_field_name');
const $form_field_veg = document.querySelector('#form_field_veg');
const $form_field_type = document.querySelector('#form_field_type');
const $form_field_description = document.querySelector('#form_field_description');
const $form_field_number = document.querySelector('#form_field_number');
const $form_field_horarioAtencion = document.querySelector('#form_field_horarioAtencion');
const $form_field_delivery = document.querySelector('#form_field_delivery');
const $form_field_redes = document.querySelector('#form_field_redes');


const dataRow = props => {

    const { _id, lat, lng, name, veg, type, description, number, horarioAtencion, delivery, redes } = props
    return `
        <div class="item">
            <div class="listado_content">
                <h2 >${name}</h2>
            </div>

            <div class="btns_wrapper">
                <a href="#" data-id="${_id}" class="btn verde handleEdit">Editar</a>
                <a href="#" data-id="${_id}" class="btn rojo handleDelete">Eliminar</a>
            </div>
        </div>
    `

}

const getTiendas = async (id = '') => {
    const result = await api.getTiendas();
    console.log(result);
    if (id == '') { //Cuando la llama el document ready;
        $listado.innherHTML = " ";
        result.forEach(element => {
            $listado.innerHTML += dataRow(element)
        });
    } else { //Cuando la llamo con un id desde edit;
        const elementById = result.find((el) => id == el._id);
        return elementById;
    }
}

getTiendas();

const deleteTienda = async (id) => {
    const result = await api.deleteTienda(id);
    console.log('Deleted');
    getTiendas();
}

const completeForm = (reg) => {
    const {lat, lng, name, veg, type, description, number, horarioAtencion, delivery, redes } = reg;
    $form_field_lat.value = lat
    $form_field_lng.value = lng
    $form_field_name.value = name
    $form_field_veg.value = veg 
    $form_field_type.value = type; 
    $form_field_description.value = description
    $form_field_number.value = number
    $form_field_horarioAtencion.value = horarioAtencion
    $form_field_delivery.value = delivery
    $form_field_redes.value = redes
}

// Handlers;
document.addEventListener('click', async function () {
    event.preventDefault();
    //Handle Delete;
    if (event.target.matches('.handleDelete')) {
        const id = event.target.dataset.id;
        console.log('clickeado el delete de id' + id);
        deleteTienda(id);
    }

    //Handle Edit;
    if (event.target.matches('.handleEdit')) {
        const id = event.target.dataset.id;
        console.log('clickeado el edit de id' + id);
        const reg = await getTiendas(id);
        console.log(reg);
        completeForm(reg);

    }
}, false)