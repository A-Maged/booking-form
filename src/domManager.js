import store from './stateManager/store';
import * as actions from './stateManager/actions';
import moment from 'moment';
import { DateRangePicker } from 'tiny-date-picker/dist/date-range-picker';
import Modal from './Modal';

let datePicker,
	modal = new Modal(),
	reservationForm = document.querySelector('[data-hook=reservation-form]'),
	searchField = reservationForm.querySelector('[ data-hook=form-field-search]'),
	dateField = reservationForm.querySelector('[ data-hook=form-field-check-in-out]'),
	occupancyField = reservationForm.querySelector('[data-hook=form-field-occupancy]'),
	occupancyDropDown = occupancyField.querySelector('.form-field__dropdown--occupancy'),
	destinitionList = reservationForm.querySelector('[ data-hook*=destinition-list]');

/* ***************************************************************** */
/* Functions That Changes The DOM Based on State (render functions) */
/* **************************************************************** */

function updateDestination() {
	searchField.value = store.getState().form.destinition;
}

function showDestinationList() {
	if (store.getState().ui.visibleDropdown === 'destination-list') {
		destinitionList.classList.add('visibile');
	}
}

function hideDestinationList() {
	if (store.getState().ui.visibleDropdown !== 'destination-list') {
		destinitionList.classList.remove('visibile');
	}
}

function showDatePicker() {
	if (store.getState().ui.visibleDropdown === 'date-picker-modal') {
		modal.open();
		datePicker = DateRangePicker(document.querySelector('.modal-body'));

		datePicker.on('statechange', function(_, dp) {
			if (dp.state.end) {
				store.dispatch(
					actions.updateCheckInOut({
						start: moment(dp.state.start).format('DD MMM YYYY'),
						end: moment(dp.state.end).format('DD MMM YYYY')
					})
				);

				modal.close();
			}
		});
	}
}

function updateDatePicker() {
	let date = store.getState().form.checkInOut;
	dateField.querySelector('div').innerHTML = date.start + ' - ' + date.end;
}

function updateOccopancy() {
	let state = store.getState().form.occupancy;

	occupancyDropDown.innerHTML = `
		<button type="button" data-hook="occupancy-add-room" class="occupancy__add-room">add room</button>
		<button type="button" data-hook="occupancy-remove-room" class="occupancy__remove-room">remove room</button>
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

function showOccupancyDropDown() {
	if (store.getState().ui.visibleDropdown === 'occupancy-dropDown') {
		occupancyDropDown.classList.add('visibile');
	}
}

function hideOccupancyDropDown() {
	if (store.getState().ui.visibleDropdown !== 'occupancy-dropDown') {
		occupancyDropDown.classList.remove('visibile');
	}
}

/* ************************** */
/* Subscribe To Store Changes */
/* ************************** */
store.subscribe(updateDestination);
store.subscribe(updateOccopancy);
store.subscribe(showDestinationList);
store.subscribe(hideDestinationList);
store.subscribe(showDatePicker);
store.subscribe(updateDatePicker);
store.subscribe(showOccupancyDropDown);
store.subscribe(hideOccupancyDropDown);
