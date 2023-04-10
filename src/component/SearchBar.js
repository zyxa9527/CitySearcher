import React, { useState, useEffect } from "react";
import "../css/SearchBar.css";
import { fetchData } from "../api";
import { useNavigate, useParams } from "react-router-dom";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import CircularProgress from "@mui/material/CircularProgress";
import Chart from "./Chart";

const SearchBar = () => {
  const navigate = useNavigate();
  const { yearPath, countyPath, districtPath } = useParams();

  const [year, setYear] = useState(null);
  const [county, setCounty] = useState(null);
  const [district, setDistrict] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submit, setSubmit] = useState(false);

  const [datas, setDatas] = useState([]);
  const [yearsOptions, setYearsOptions] = useState([]);
  const [countyOptions, setCountyOptions] = useState([]);

  useEffect(() => {
    //URL參數
    if (yearPath && countyPath && districtPath) {
      setYear(yearPath);
      setCounty(countyPath);
      setDistrict(districtPath);
      setSubmit(true);
    }

    setLoading(true);
    fetchData()
      .then((response) => {
        const data = response.data.responseData.splice(-200);
        setDatas(data);
        setYearsOptions([...new Set(data.map((e) => Object.values(e)[0]))]);
        setYear(data.map((e) => Object.values(e)[0])[0]);
        setCountyOptions([...new Set(data.map((e) => e.site_id))]);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/${year}/${county}/${district}`);
    setSubmit(true);
  };

  const handleYearChange = (e, value) => {
    setYear(value);
  };

  const handleCountyChange = (e, value) => {
    setCounty(value);
    setDistrict(null);
  };

  const handleDistrictChange = (e, value) => {
    setDistrict(value);
  };

  const isSubmitDisabled = !year || !county || !district;
  return (
    <div className="SearchBar">
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <Autocomplete
            className="input-group-year"
            options={yearsOptions}
            getOptionLabel={(option) => option}
            value={year}
            onChange={handleYearChange}
            renderInput={(params) => (
              <TextField {...params} label="年份" variant="outlined" />
            )}
          />
        </div>
        <div className="input-group">
          <Autocomplete
            className="input-group-country"
            options={countyOptions}
            getOptionLabel={(option) => option}
            value={county}
            onChange={handleCountyChange}
            renderInput={(params) => (
              <TextField
                {...params}
                label="縣/市"
                placeholder="請選擇 縣/市"
                variant="outlined"
              />
            )}
          />
        </div>
        <div className="input-group">
          <Autocomplete
            className="input-group-district"
            options={
              county &&
              datas.filter((e) => e.site_id === county).map((e) => e.village)
                ? datas
                    .filter((e) => e.site_id === county)
                    .map((e) => e.village)
                : []
            }
            getOptionLabel={(option) => option}
            value={district}
            onChange={handleDistrictChange}
            disabled={!county}
            renderInput={(params) => (
              <TextField
                {...params}
                label="區"
                placeholder="請選擇 縣/市"
                variant="outlined"
              />
            )}
          />
        </div>
        <div className="input-group">
          <Button
            className="button"
            variant="contained"
            color="primary"
            type="submit"
            disabled={isSubmitDisabled}
          >
            Submit
          </Button>
        </div>
      </form>
      <Divider orientation="horizontal">
        <Button
          variant="outlined"
          color="secondary"
          style={{ borderRadius: "20px" }}
          disableRipple
        >
          搜尋結果
        </Button>
      </Divider>
      {loading && <CircularProgress size={24} />}
      {year && county && district && (
        <div className="chart-container">
          <Chart
            data={datas}
            year={year}
            county={county}
            district={district}
            submit={submit}
          />
        </div>
      )}
    </div>
  );
};

export default SearchBar;
