import React from 'react';
import {CalendarList} from 'react-native-calendars';
import {View} from 'react-native';
import CalendarListStyles from './styles/CalendarListStyles';
import {getCurrentDate} from '../redux/CalorieTrackerConstants';
import reactotron from 'reactotron-react-native';
import {findCalorieBurnout} from '../redux/CalorieTrackerAction';
import {connect} from 'react-redux';
import FoodSectionList from './FoodSectionList';

const XDate = require('xdate');

const FoodCalendarList = ({
  findCalorieBurnout,
  calorieList,
  currentDate = getCurrentDate(),
}) => {
  reactotron.log('render:FoodCalendarList');
  return (
    <View styles={CalendarListStyles.container}>
      <FoodSectionList
        style={CalendarListStyles.listContainer}
        section_data={calorieList}
        ListHeaderComponent={
          <DateRangePicker
            style={{
              borderWidth: 1,
              borderColor: 'gray',
              height: 320,
            }}
            maxDate={currentDate}
            initialRange={[currentDate, currentDate]}
            onSuccess={(s, e) => findCalorieBurnout(s, e)}
          />
        }
      />
    </View>
  );
};

class DateRangePicker extends React.Component {
  state = {isFromDatePicked: false, isToDatePicked: false, markedDates: {}};

  componentDidMount() {
    this.setupInitialRange();
  }

  onDayPress = day => {
    if (
      !this.state.isFromDatePicked ||
      (this.state.isFromDatePicked && this.state.isToDatePicked)
    ) {
      this.setupStartMarker(day);
    } else if (!this.state.isToDatePicked) {
      let markedDates = {...this.state.markedDates};
      let [mMarkedDates, range] = this.setupMarkedDates(
        this.state.fromDate,
        day.dateString,
        markedDates,
      );
      if (range >= 0) {
        this.setState({
          isFromDatePicked: true,
          isToDatePicked: true,
          markedDates: mMarkedDates,
        });
        this.props.onSuccess(this.state.fromDate, day.dateString);
      } else {
        this.setupStartMarker(day);
      }
    }
  };

  setupStartMarker = day => {
    let markedDates = {
      [day.dateString]: {
        startingDay: true,
        color: this.props.theme.markColor,
        textColor: this.props.theme.markTextColor,
      },
    };
    this.setState({
      isFromDatePicked: true,
      isToDatePicked: false,
      fromDate: day.dateString,
      markedDates: markedDates,
    });
  };

  setupMarkedDates = (fromDate, toDate, markedDates) => {
    let mFromDate = new XDate(fromDate);
    let mToDate = new XDate(toDate);
    let range = mFromDate.diffDays(mToDate);
    if (range >= 0) {
      if (range == 0) {
        markedDates = {
          [toDate]: {
            color: this.props.theme.markColor,
            textColor: this.props.theme.markTextColor,
          },
        };
      } else {
        for (var i = 1; i <= range; i++) {
          let tempDate = mFromDate.addDays(1).toString('yyyy-MM-dd');
          if (i < range) {
            markedDates[tempDate] = {
              color: this.props.theme.markColor,
              textColor: this.props.theme.markTextColor,
            };
          } else {
            markedDates[tempDate] = {
              endingDay: true,
              color: this.props.theme.markColor,
              textColor: this.props.theme.markTextColor,
            };
          }
        }
      }
    }
    return [markedDates, range];
  };

  setupInitialRange = () => {
    if (!this.props.initialRange) {
      return;
    }
    let [fromDate, toDate] = this.props.initialRange;
    let markedDates = {
      [fromDate]: {
        startingDay: true,
        color: this.props.theme.markColor,
        textColor: this.props.theme.markTextColor,
      },
    };
    let [mMarkedDates, range] = this.setupMarkedDates(
      fromDate,
      toDate,
      markedDates,
    );
    this.setState({markedDates: mMarkedDates, fromDate: fromDate});
  };

  render() {
    reactotron.log('render:DateRangePicker', this.state.markedDates);
    return (
      <CalendarList
        {...this.props}
        horizontal={true}
        pagingEnabled={true}
        pastScrollRange={10}
        futureScrollRange={1}
        markingType={'period'}
        current={this.state.fromDate}
        markedDates={this.state.markedDates}
        maxDate={this.props.maxDate}
        onDayPress={day => {
          this.onDayPress(day);
        }}
      />
    );
  }
}
DateRangePicker.defaultProps = {
  theme: {markColor: '#ff6347', markTextColor: '#ffffff'},
};

const mapStateToProps = state => ({
  calorieList: state.calorieTrackerState.calorieList,
});

const mapDispatchToProps = {
  findCalorieBurnout,
};
export default connect(mapStateToProps, mapDispatchToProps)(FoodCalendarList);
