import React, {useEffect, useMemo} from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import AdminDashboardStyles, {
  sectionChartPadding,
} from './styles/AdminDashboardStyles';
import {connect} from 'react-redux';
import {getAdminAnalyticsData} from '../redux/AdminAction';
import {
  Chart,
  HorizontalAxis,
  Line,
  VerticalAxis,
} from 'react-native-responsive-linechart';
import {isValidElement} from '../../auth/redux/LoginConstants';
import {Ionicons} from '@expo/vector-icons';
import useLayoutEffect from 'react-native-web/dist/modules/useLayoutEffect';

const AdminDashboardView = ({getAdminAnalyticsData, navigation, chartData}) => {
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getAdminAnalyticsData();
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [getAdminAnalyticsData, navigation]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => navigation.navigate('AdminList')}
          style={{padding: 6, marginRight: 10}}>
          <Ionicons name={'list'} size={30} color={'tomato'} />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  return (
    <View style={AdminDashboardStyles.container}>
      <ScrollView>
        <ChartView
          heading={`Today ${
            chartData?.avg_calories?.today ?? ''
          } Calories/User added`}
          xDates={chartData?.avg_calories?.newDates}
          newData={chartData?.avg_calories?.newValue}
          oldData={chartData?.avg_calories?.oldValue}
        />
        <ChartView
          heading={`Today ${chartData?.entries?.today ?? ''} entries added`}
          xDates={chartData?.entries?.newDates}
          newData={chartData?.entries?.newValue}
          oldData={chartData?.entries?.oldValue}
        />
      </ScrollView>
    </View>
  );
};

const ChartView = ({heading, xDates, newData, oldData}) => {
  if (
    !isValidElement(xDates) ||
    !isValidElement(newData) ||
    !isValidElement(oldData)
  ) {
    return null;
  }
  const [xTickValues, newChartData, oldChartData, xMax, yMin, yMax] =
    useMemo(() => {
      const _xMax = newData.length - 1;
      let maxYFound = 0;
      let minYFound = 0;
      // xTickValues.length === newData.length === oldData.length
      const _xTickValues = [...new Array(newData.length).keys()];
      const _newChartData = _xTickValues.map((_, index) => {
        let y = newData[index] ?? 0;
        if (y < maxYFound) {
          minYFound = y;
        }
        if (y > maxYFound) {
          maxYFound = y;
        }
        return {x: index, y: y};
      });
      const _oldChartData = _xTickValues.map((_, index) => {
        let y = oldData[index] ?? 0;
        if (y < maxYFound) {
          minYFound = y;
        }
        if (y > maxYFound) {
          maxYFound = y;
        }
        return {x: index, y: y};
      });
      let _yMin = minYFound;
      let _yMax = maxYFound + 0.1 * maxYFound;
      return [_xTickValues, _newChartData, _oldChartData, _xMax, _yMin, _yMax];
    }, [newData, oldData]);
  return (
    <View style={AdminDashboardStyles.sectionParentContainer}>
      <Text style={AdminDashboardStyles.sectionText}>{heading}</Text>
      <Chart
        style={AdminDashboardStyles.sectionChart}
        xDomain={{min: 0, max: xMax}}
        yDomain={{min: yMin, max: yMax}}
        padding={sectionChartPadding}>
        <VerticalAxis tickCount={3} theme={{labels: {label: {fontSize: 13}}}} />
        <HorizontalAxis
          tickValues={xTickValues}
          theme={{
            labels: {formatter: v => xDates[v], label: {fontSize: 13, dy: -20}},
          }}
          includeOriginTick={false}
        />
        <Line
          data={oldChartData}
          smoothing="cubic-spline"
          theme={{stroke: {color: 'rgba(52, 52, 52, 0.2)', width: 3}}}
        />
        <Line
          data={newChartData}
          smoothing="cubic-spline"
          theme={{stroke: {color: 'blue', width: 3}}}
        />
      </Chart>
    </View>
  );
};

const xlabel = ['31 May', '1 Jun', '2', '3', '4', '5', '6 Jun'];

const mapStateToProps = state => ({
  chartData: state.adminState.chartData,
});

const mapDispatchToProps = {
  getAdminAnalyticsData,
};
export default connect(mapStateToProps, mapDispatchToProps)(AdminDashboardView);
