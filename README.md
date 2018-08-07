# React Powered Campaigns Filter

Start:

    yarn && yarn start

Test:

    yarn test

Public method:

    AddCampaigns()

Sample expected payload:

```javascript
[
  { id: 1, name: 'Gotham City', startDate: '05/20/2018', endDate: '09/22/2018', Budget: 239507 },
  { id: 2, name: 'R2-D2', startDate: '10/15/2017', endDate: '12/30/2018', Budget: 1349838 },
];
```

Note: 1) Date format is `MM/DD/YYYY` 2) Key for budget is `Budget`, starts with upper case.

Demo: http://react-filter.surge.sh/
