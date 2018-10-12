import store from './stateManager/store';
import { DateRangePicker } from 'tiny-date-picker/dist/date-range-picker';
import Modal from './Modal';

let datePicker,
	modal = new Modal(),
	reservationForm = document.querySelector('[data-hook=reservation-form]'),
	searchField = reservationForm.querySelector('[ data-hook=form-field-search]'),
	occupancyField = reservationForm.querySelector('[data-hook=form-field-occupancy]'),
	occupancyDropDown = occupancyField.querySelector('.form-field__dropdown--occupancy'),
	destinitionList = reservationForm.querySelector('[ data-hook*=destinition-list]');

/*******************************/
/* Functions That Changes DOM */
/*******************************/

function updateDestinationDOM() {
	searchField.value = store.getState().form.destinition;
}

function showDestinationListDOM() {
	if (store.getState().ui.visibleDropdown === 'destination-list') {
		destinitionList.classList.add('visibile');
	}
}

function hideDestinationListDOM() {
	if (store.getState().ui.visibleDropdown !== 'destination-list') {
		destinitionList.classList.remove('visibile');
	}
}

function showDatePickerDOM() {
	if (store.getState().ui.visibleDropdown === 'date-picker-modal') {
		modal.open();
		datePicker = DateRangePicker(document.querySelector('.modal-body'));
	}
}

function updateOccopancyDOM() {
	let state = store.getState().form.occupancy;
	occupancyDropDown.innerHTML = `
		<button data-hook="occupancy-add-room" class="occupancy__add-room">add room</button>
	`;

	state.forEach((room, idx) => {
		occupancyDropDown.innerHTML += `
			<div class="occupancy__room">
				<span class="occupancy__room__label">Room ${idx + 1}</span>
				<select name="occupancy__room-${idx}-adults">
					<option selected="selected" value="${room.adults}">${room.adults}</option>
					<option value="1">1</option>
					<option value="2">2</option>
					<option value="3">3</option>
				</select>
			</div>
		`;
	});
}

function showOccupancyDropDownDOM() {
	if (store.getState().ui.visibleDropdown === 'occupancy-dropDown') {
		occupancyDropDown.classList.add('visibile');
	}
}

function hideOccupancyDropDownDOM() {
	if (store.getState().ui.visibleDropdown !== 'occupancy-dropDown') {
		occupancyDropDown.classList.remove('visibile');
	}
}

/* ************************** */
/* Subscribe To Store Changes */
/* ************************** */
store.subscribe(updateDestinationDOM);
store.subscribe(updateOccopancyDOM);
store.subscribe(showDestinationListDOM);
store.subscribe(hideDestinationListDOM);
store.subscribe(showDatePickerDOM);
store.subscribe(showOccupancyDropDownDOM);
store.subscribe(hideOccupancyDropDownDOM);