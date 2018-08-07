import React, { Component } from 'react';
import filter from 'lodash/filter';
import map from 'lodash/map';
import debounce from 'lodash/debounce';
import { DATE_START, DATE_END, START_DATE_ERROR, END_DATE_ERROR } from '../../config/date';
import { inRange, convertToTimestamp } from '../../services/date';
import CampaignList from '../../components/campaign-list';
import DateRange from '../../components/date-range';
import SearchBox from '../../components/search-box';
import seedData from './seed-data';

class Campaigns extends Component {
  defaults = {
    startDate: null,
    endDate: null,
  };

  state = {
    campaigns: [],
    startDate: null,
    endDate: null,
    searchTerm: '',
    dateError: '',
  };

  componentDidMount() {
    this.AddCampaigns(seedData);

    // Expose the method to the browser console
    window.AddCampaigns = this.AddCampaigns;
  }

  // Appends new set of campaigns to the existing list of campaigns
  AddCampaigns = newCampaigns => {
    const { campaigns, startDate, endDate } = this.processNewData(newCampaigns);
    this.defaults.startDate = startDate;
    this.defaults.endDate = endDate;

    this.setState(state => ({
      campaigns: [...state.campaigns, ...campaigns],
      startDate,
      endDate,
    }));
  };

  // Normalizes the data to the structure expected by the application
  // Calculates the default campaign start and end dates
  processNewData(campaignsData) {
    const campaigns = this.removeCampaignsWithBadDate(this.convertDatesToTimestamp(campaignsData));
    let startDate = null;
    let endDate = null;

    if (campaigns.length) {
      // The first start date of all the campaigns
      startDate = campaigns.map(item => item.startDate).sort((a, b) => a - b)[0];

      // The last end date of all the campaigns
      endDate = campaigns.map(item => item.endDate).sort((a, b) => a - b)[campaigns.length - 1];
    }

    return { campaigns, startDate, endDate };
  }

  // Converts dates to timestamp for easy subsequent calculations
  convertDatesToTimestamp = campaigns =>
    map(campaigns, item => ({
      ...item,
      startDate: convertToTimestamp(item.startDate),
      endDate: convertToTimestamp(item.endDate),
    }));

  // Removes campaigns with end date prior to the start date
  removeCampaignsWithBadDate = items => filter(items, item => item.endDate > item.startDate);

  // Filter the campaigns based on the values in the state
  filterCampaigns = campaigns =>
    this.filterByDate(
      this.filterByCampaignName(campaigns, this.state.searchTerm),
      this.state.startDate,
      this.state.endDate,
    );

  filterByCampaignName = (items, term = '') =>
    filter(items, item => item.name && item.name.toLowerCase().includes(term.toLowerCase()));

  filterByDate = (items, startDate, endDate) =>
    filter(
      items,
      item =>
        inRange(item.startDate, startDate, endDate) || inRange(item.endDate, startDate, endDate),
    );

  onSearchTermChange = debounce((searchTerm = '') => {
    this.setState({ searchTerm });
  }, 200);

  onDateChange = (date, type) => {
    const { startDate, endDate } = this.state;

    // Set the start date only if its equal to or before end date
    if (type === DATE_START) {
      if (date <= endDate) {
        this.setState({ startDate: date, dateError: '' });
      } else {
        this.setState({ dateError: START_DATE_ERROR });
      }

      // Set the end date only if its equal to or after start date
    } else if (type === DATE_END) {
      if (date >= startDate) {
        this.setState({ endDate: date, dateError: '' });
      } else {
        this.setState({ dateError: END_DATE_ERROR });
      }
    }
  };

  resetDate = () => {
    const { startDate, endDate } = this.defaults;
    this.setState({ startDate, endDate, dateError: '' });
  };

  render() {
    return (
      <div className="campaigns">
        <header className="campaigns__header">
          <DateRange
            startDate={this.state.startDate}
            endDate={this.state.endDate}
            onChange={this.onDateChange}
            onReset={this.resetDate}
            error={this.state.dateError}
          />
          <div>
            <SearchBox onChange={this.onSearchTermChange} />
          </div>
        </header>
        <main>
          <CampaignList campaigns={this.filterCampaigns(this.state.campaigns)} />
        </main>
      </div>
    );
  }
}

export default Campaigns;
