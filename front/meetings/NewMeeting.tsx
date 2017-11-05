import * as React from 'react';
import {Meeting} from '../api/Meeting';
import {connect, MapDispatchToProps, MapStateToProps} from 'react-redux';
import {Actions} from './Actions';
import {Moment} from 'moment';
import {PendingEntityManager} from '../core/PendingEntityManager';
import * as Datetime from 'react-datetime';
import {State} from '../store/reducer';
import moment = require('moment');

type Props = DispatchProps & StateProps;
const component: React.StatelessComponent<Props> = ({
  selectedDate,
  createMeeting,
  openCalendar,
  closeCalendar,
  calendarIsOpen,
  updateSelectedDate,
  clearCalendar,
}) => {
  if (calendarIsOpen) {
    return renderCalendar();
  }
  return renderCreateButton();

  function renderCreateButton() {
    return (
      <div>
        <label htmlFor='new-meeting'>New Meeting</label>
        <button
          id='new-meeting'
          onClick={openCalendar}
        >
          <i className="glyphicon-plus"/>
        </button>
      </div>
    );
  }

  function renderCalendar() {
    return (
      <div>
        <button
          className="btn btn-primary"
          style={{marginRight: '10px'}}
          disabled={selectedDate === undefined}
          onClick={() => {
            if (selectedDate !== undefined) {
              const meeting = {
                id: PendingEntityManager.getTempId(),
                date: selectedDate,
              };
              createMeeting(meeting);
              clearCalendar();
              closeCalendar();
            }
          }}
        >
          OK
        </button>
        <button
          className="btn btn-default"
          onClick={() => {
            closeCalendar();
            clearCalendar();
          }}
        >
          Cancel
        </button>
        <Datetime
          value={selectedDate}
          onChange={(date) => {
            if (moment.isMoment(date)) {
              updateSelectedDate(date);
              return;
            }
            console.log(date);
          }}
          onBlur={clearCalendar}
          input={false}
        />
      </div>
    );
  }
};

interface DispatchProps {
  createMeeting: (meeting: Meeting) => void;
  openCalendar: () => void;
  closeCalendar: () => void;
  updateSelectedDate: (date: Moment) => void;
  clearCalendar: () => void;
}

const dispatchMap: MapDispatchToProps<DispatchProps, {}> = dispatch => (
  {
    createMeeting: (meeting: Meeting) => dispatch(Actions.createMeeting(meeting)),
    openCalendar: () => dispatch(Actions.setNewMeetingCalendarOpenState(true)),
    closeCalendar: () => dispatch(Actions.setNewMeetingCalendarOpenState(false)),
    updateSelectedDate: (date: Moment) => dispatch(Actions.updateSelectedDateForNewMeeting(date.toDate())),
    clearCalendar: () => dispatch(Actions.resetSelectedDateForNewMeeting()),
  }
);

interface StateProps {
  calendarIsOpen: boolean;
  selectedDate: undefined | Date;
}

const stateMap: MapStateToProps<StateProps, {}> = (state: State) => (
  {
    calendarIsOpen: state.meetings.newMeeting.isOpen,
    selectedDate: state.meetings.newMeeting.selectedDate,
  }
);


export const NewMeeting = connect<StateProps, DispatchProps, {}>(stateMap, dispatchMap)(component);
NewMeeting.displayName = 'NewMeeting';