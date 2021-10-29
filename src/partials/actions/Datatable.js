import React, { useEffect, useState } from 'react';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { loadTravel } from '../../appRedux/actions';
import { useDispatch } from 'react-redux';

function Datatable() {
  const [gridApi, setGridApi] = useState(null);
  const perPage = 6;
  const dispatch = useDispatch();

  const onGridReady = (params) => {
      console.log(params, 'params');
    setGridApi(params.api);
  };

  const [page] = useState({
		companyid: -1,
		employeeid: -1,
    startdate: null,
    enddate: null,
		order:'',
		column:'',
		currentpage:1,
		count:10
	})
  
  useEffect(() => {
    dispatch(loadTravel(page));
    if (gridApi) {
      const dataSource = {
        getRows: (params) => {
          const page = params.endRow / perPage;
          fetch(`https://reqres.in/api/users?per_page=${perPage}&page=${page}`)
            .then(resp => resp.json())
            .then(res => {
              params.successCallback(res.data, res.total);
            }).catch(err => {
              params.successCallback([], 0);
            });
        }
      }
      gridApi.setDatasource(dataSource);    
    }
  }, [gridApi]);

  const avatarFormatter = ({ value }) => {
    return <img src={value} width="50px" height="50px" />
  }

  return (
    <div className="datatable_main">
      <div className="ag-theme-alpine ag-style">
        <AgGridReact
          pagination={true}
          rowModelType={'infinite'}
          paginationPageSize={perPage}
          cacheBlockSize={perPage}
          onGridReady={onGridReady}
          rowHeight={60}
          defaultColDef={{ flex: 1 }}>

          <AgGridColumn field="first_name" headerName="First Name" cellClass="vertical-middle" />
          <AgGridColumn field="last_name" headerName="Last Name" cellClass="vertical-middle" />
          <AgGridColumn field="email" headerName="Email" cellClass="vertical-middle" />
          <AgGridColumn field="avatar" headerName="Avatar" cellRendererFramework={avatarFormatter} cellClass="vertical-middle" />
        </AgGridReact>
      </div>
    </div>
  );
}

export default Datatable;
