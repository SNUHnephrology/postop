import React, {useState, useEffect} from 'react';
import Header from './header';
import {Button, Form, Table} from 'react-bootstrap';
import lodash from 'lodash';
import 'bootstrap/dist/css/bootstrap.min.css'; // import react-bootstrap
import './App.css';


function App() {
  // boolean은 gender male false, female true, scr unit false가 mg/dL, true가 umol/L, 그 외에는 버튼 왼쪽값이 true
  type patientData = {age: number, gender: boolean|undefined, eGFR: number, albuminuria: boolean|undefined, surgicalDuration: number, emergencyOP: boolean|undefined, diabetesMellitus: boolean|undefined, blockadeUsage: boolean|undefined, hypoalbuminemia: boolean|undefined, anemia: boolean|undefined, hyponatremia: boolean|undefined};

  const [age, setAge] = useState<string>("");
  const [genderValue, setGenderValue] = useState<boolean>();
  const [egfr, setEgfr] = useState<string>("");
  const [useScr, setUseScr] = useState<boolean>(false);
  const [scr, setScr] = useState<string>("");
  const [scrFloat, setScrFloat] = useState<number>();
  const [scrUnitValue, setScrUnitValue] = useState<boolean>(false);
  const [calculatedEgfr, setCalculatedEgfr] = useState<string>("");
  const [dipstickAlbuminuria, setDipstickAlbuminuria] = useState<boolean>();
  const [surgDuration, setSurgDuration] = useState<string>("");
  const [emergency, setEmergency] = useState<boolean>();
  const [diabetesMellitus, setDiabetesMellitus] = useState<boolean>();
  const [blockAdeUsage, setBlockAdeUsage] = useState<boolean>();

  const [hypoalbuminemia, setHypoalbuminemia] = useState<boolean>();
  const [useAlbumin, setUseAlbumin] = useState<boolean>();
  const [albumin, setAlbumin] = useState<string>("");
  const [anemia, setAnemia] = useState<boolean>();
  const [useHemoglobin, setUseHemoglobin] = useState<boolean>();
  const [hemoglobin, setHemoglobin] = useState<string>("");
  const [hyponatremia, setHyponatremia] = useState<boolean>();
  const [useSodium, setUseSodium] = useState<boolean>();
  const [sodium, setSodium] = useState<string>("");

  const [akiStageValue, setAkiStageValue] = useState<number>();
  const [ethValue, setEthValue] = useState<boolean>();
  const [usePostOPScr, setUsePostOPScr] = useState<boolean>(false);
  const [postOPScr, setPostOPScr] = useState<string>("");
  const [postOPScrFloat, setPostOPScrFloat] = useState<number>();
  const [postscrUnitValue, setPostScrUnitValue] = useState<boolean>(false);
  const [calculatedAKIStage, setCalculatedAKIStage] = useState<number>();
  const [malhistory, setMalhistory] = useState<boolean>();

  const [finalScore, setFinalScore] = useState<number>();
  const [isScoreOn, setIsScoreOn] = useState<boolean>(false);
  const [isAdditionalScoreOn, setIsAdditionalScoreOn] = useState<boolean>(false);
  const [oneyearmortalityProbability, setOneyearMortalityProbability] = useState<number>();
  const [oneyearmortalityProbabilityAdditional, setOneyearMortalityProbabilityAdditional] = useState<number>();
  const [threeyearmortalityProbability, setThreeyearMortalityProbability] = useState<number>();
  const [threeyearmortalityProbabilityAdditional, setThreeyearMortalityProbabilityAdditional] = useState<number>();

  const ageNormalRange = [19, 150];
  const eGFRNormalRange = [15, 500];
  const scrmgNormalRange = [0.1, 4.0];
  const scrumolNormalRange = [50, 1000]; // 없음
  const surgDurationNormalRange = [0, 48]; // 없음
  const albuminNormalRange = [0.1, 9.9];
  const hemoglobinNormalRange = [1.0, 29.9];
  const sodiumNormalRange = [100, 200];

  const [formError, setFormError] = useState<boolean[]>(Array(19).fill(false));
  const [rangeError, setRangeError] = useState<boolean[]>(Array(8).fill(false));

// Age 관련
  const handleAge = (event : any) => {
    let val = event.target.value.replace(/[^0-9]/g, "");
    setAge(val);
  };

  const handleAgeFocus = (e: any) => {
    let form_tmp = lodash.cloneDeep(formError);
    let range_tmp = lodash.cloneDeep(rangeError);
    form_tmp[0] = false;
    range_tmp[0] = false;
    setFormError(form_tmp);
    setRangeError(range_tmp);
  }

  const handleAgeBlur = (e : any) => {
    let tmp = parseInt(age);
    if (age){
      if (tmp<ageNormalRange[0] || tmp>ageNormalRange[1]){
        let form_tmp = lodash.cloneDeep(formError);
        let range_tmp = lodash.cloneDeep(rangeError);
        form_tmp[0] = true;
        range_tmp[0] = true;
        setFormError(form_tmp);
        setRangeError(range_tmp);
      }
      else {
        let form_tmp = lodash.cloneDeep(formError);
        let range_tmp = lodash.cloneDeep(rangeError);
        form_tmp[0] = false;
        range_tmp[0] = false;
        setFormError(form_tmp);
        setRangeError(range_tmp);
      }
    }
  }

// Sex 관련
  const handleSex = (gend : boolean) => {
    let form_tmp = lodash.cloneDeep(formError);
    form_tmp[1] = false;
    setFormError(form_tmp);
    setGenderValue(gend);
  };

// EGFR 관련
  const handleEgfr = (event : any) => {
    let val = event.target.value.replace(/[^0-9.]/g, "");
    if (val.split('.').length -1 <= 1) setEgfr(val);
  };

  const handleEGFRFocus = (e: any) => {
    let form_tmp = lodash.cloneDeep(formError);
    let range_tmp = lodash.cloneDeep(rangeError);
    form_tmp[2] = false;
    range_tmp[1] = false;
    setFormError(form_tmp);
    setRangeError(range_tmp);
  }

  const handleEGFRBlur = (e : any) => {
    let tmp = parseFloat(egfr);
    if (egfr){
      if (tmp<eGFRNormalRange[0] || tmp>eGFRNormalRange[1]){
        let form_tmp = lodash.cloneDeep(formError);
        let range_tmp = lodash.cloneDeep(rangeError);
        form_tmp[2] = true;
        range_tmp[1] = true;
        setFormError(form_tmp);
        setRangeError(range_tmp);
      }
      else {
        let form_tmp = lodash.cloneDeep(formError);
        let range_tmp = lodash.cloneDeep(rangeError);
        form_tmp[2] = false;
        range_tmp[1] = false;
        setFormError(form_tmp);
        setRangeError(range_tmp);
      }
    }
  }
  // Calculate eGFR by cr values 일 때
  const handleUseScrClick = (check : boolean) => {
    if(check){
      // use Scr to calculate eGFR
      setEgfr("");
      setUseScr(check);
      let form_tmp = lodash.cloneDeep(formError);
      let range_tmp = lodash.cloneDeep(rangeError);
      form_tmp[2] = false;
      range_tmp[1] = false;
      setFormError(form_tmp);
      setRangeError(range_tmp);
    }
    else{
      setScr("");
      setScrFloat(undefined);
      setEthValue(undefined);
      setCalculatedEgfr("");
      setUseScr(check);
      let form_tmp = lodash.cloneDeep(formError);
      let range_tmp = lodash.cloneDeep(rangeError);
      form_tmp[3] = false;
      form_tmp[4] = false;
      range_tmp[2] = false;
      setFormError(form_tmp);
      setRangeError(range_tmp);
    }
  }

  // Scr 관련
  const handleScrUnit = (unit : boolean) => {
    if(unit === false) {
      if(scrUnitValue && scrFloat) {
        try {
          let tmp = scrFloat/88.42;
          if ( tmp<scrmgNormalRange[0] || tmp>scrmgNormalRange[1]) {
            let form_tmp = lodash.cloneDeep(formError);
            let range_tmp = lodash.cloneDeep(rangeError);
            form_tmp[3] = true;
            range_tmp[2] = true;
            setFormError(form_tmp);
            setRangeError(range_tmp);
          }
          else {
            let form_tmp = lodash.cloneDeep(formError);
            let range_tmp = lodash.cloneDeep(rangeError);
            form_tmp[3] = false;
            range_tmp[2] = false;
            setFormError(form_tmp);
            setRangeError(range_tmp);
          }
          setScrFloat(tmp);
          setScr(String(tmp.toFixed(2)));
        } catch(error){
          console.log(error);
          alert(error);
        }
      }
      setScrUnitValue(false);
    }
    else {
      if(!scrUnitValue && scrFloat) {
        try {
          let tmp = scrFloat*88.42;
          if (tmp<scrumolNormalRange[0] || tmp>scrumolNormalRange[1]){
            let form_tmp = lodash.cloneDeep(formError);
            let range_tmp = lodash.cloneDeep(rangeError);
            form_tmp[3] = true;
            range_tmp[2] = true;
            setFormError(form_tmp);
            setRangeError(range_tmp);
          }
          else {
            let form_tmp = lodash.cloneDeep(formError);
            let range_tmp = lodash.cloneDeep(rangeError);
            form_tmp[3] = false;
            range_tmp[2] = false;
            setFormError(form_tmp);
            setRangeError(range_tmp);
          }
          setScrFloat(tmp);
          setScr(String(tmp.toFixed(2)));
        } catch(error){
          console.log(error);
          alert(error);
        }
      }
      setScrUnitValue(true);
    }
  };

  const handleScr = (event : any) => {
    let val = event.target.value.replace(/[^0-9.]/g, "");
    if (val.split('.').length -1 <= 1) {
      setScr(val);
      let tmp = parseFloat(val);
      setScrFloat(tmp);
    }
  };

  const handleScrFocus = (e: any) => {
    let form_tmp = lodash.cloneDeep(formError);
    let range_tmp = lodash.cloneDeep(rangeError);
    form_tmp[3] = false;
    range_tmp[2] = false;
    setFormError(form_tmp);
    setRangeError(range_tmp);
  }

  const handleScrBlur = (e : any) => {
    let tmp = parseFloat(scr);
    if (scr){
      if (!scrUnitValue){
        if(tmp<scrmgNormalRange[0] || tmp>scrmgNormalRange[1]){
          let form_tmp = lodash.cloneDeep(formError);
          let range_tmp = lodash.cloneDeep(rangeError);
          form_tmp[3] = true;
          range_tmp[2] = true;
          setFormError(form_tmp);
          setRangeError(range_tmp);
        }
        else{
          let form_tmp = lodash.cloneDeep(formError);
          let range_tmp = lodash.cloneDeep(rangeError);
          form_tmp[3] = false;
          range_tmp[2] = false;
          setFormError(form_tmp);
          setRangeError(range_tmp);
        }
      }
      else{
        if(tmp<scrumolNormalRange[0] || tmp>scrumolNormalRange[1]){
          let form_tmp = lodash.cloneDeep(formError);
          let range_tmp = lodash.cloneDeep(rangeError);
          form_tmp[3] = true;
          range_tmp[2] = true;
          setFormError(form_tmp);
          setRangeError(range_tmp);
        }
        else{
          let form_tmp = lodash.cloneDeep(formError);
          let range_tmp = lodash.cloneDeep(rangeError);
          form_tmp[3] = false;
          range_tmp[2] = false;
          setFormError(form_tmp);
          setRangeError(range_tmp);
        }
      }
    }
  }

  const handleEth = (eth : boolean) => {
    let form_tmp = lodash.cloneDeep(formError);
    form_tmp[4] = false;
    setFormError(form_tmp);
    setEthValue(eth);
  };

// Dipstick Albuminuria 관련
  const handleDipAlbuminuria = (dalb : boolean) => {
    let form_tmp = lodash.cloneDeep(formError);
    form_tmp[5] = false;
    setFormError(form_tmp);
    setDipstickAlbuminuria(dalb);
  };

// Expected surgical duration 관련
  const handleSurgicalDuration = (event : any) => {
    let val = event.target.value.replace(/[^0-9.]/g, "");
    if (val.split('.').length -1 <= 1) setSurgDuration(val);
  };

  const handleSurgicalDurationFocus = (e: any) => {
    let form_tmp = lodash.cloneDeep(formError);
    let range_tmp = lodash.cloneDeep(rangeError);
    form_tmp[6] = false;
    range_tmp[3] = false;
    setFormError(form_tmp);
    setRangeError(range_tmp);
  }

  const handleSurgicalDurationBlur = (e : any) => {
    let tmp = parseFloat(surgDuration);

    if (surgDuration){
      if(tmp<surgDurationNormalRange[0] || tmp >surgDurationNormalRange[1] ){
        let form_tmp = lodash.cloneDeep(formError);
        let range_tmp = lodash.cloneDeep(rangeError);
        form_tmp[6] = true;
        range_tmp[3] = true;
        setFormError(form_tmp);
        setRangeError(range_tmp);
      }
      else{
        let form_tmp = lodash.cloneDeep(formError);
        let range_tmp = lodash.cloneDeep(rangeError);
        form_tmp[6] = false;
        range_tmp[3] = false;
        setFormError(form_tmp);
        setRangeError(range_tmp);
      }
    }
  }

// Emergency Operation 관련
  const handleEmergency = (isEmergency : boolean) => {
    let form_tmp = lodash.cloneDeep(formError);
    form_tmp[7] = false;
    setFormError(form_tmp);
    setEmergency(isEmergency);
  };

// Diabetes mellitus 관련
  const handleDiabetestMellitus = (isDiabetesMellitus : boolean) => {
    let form_tmp = lodash.cloneDeep(formError);
    form_tmp[8] = false;
    setFormError(form_tmp);
    setDiabetesMellitus(isDiabetesMellitus);
  };

// RAAS blockade use 관련
  const handleBlockAdeUsage = (isBlockAdeUser : boolean) => {
    let form_tmp = lodash.cloneDeep(formError);
    form_tmp[9] = false;
    setFormError(form_tmp);
    setBlockAdeUsage(isBlockAdeUser);
  };

// Hypoalbuminemia 관련
  const handleHypoalbuminemia = (isHypoalbuminemia : boolean) => {
    let form_tmp = lodash.cloneDeep(formError);
    form_tmp[10] = false;
    setFormError(form_tmp);
    setHypoalbuminemia(isHypoalbuminemia);
  };

  const handleUseAlbuminClick = (check : boolean) => {
    if(check){
      // use albumin to calculate hypoalbuminemia
      setHypoalbuminemia(undefined);
      setUseAlbumin(check);
      let form_tmp = lodash.cloneDeep(formError);
      let range_tmp = lodash.cloneDeep(rangeError);
      form_tmp[10] = false;
      setFormError(form_tmp);
      setRangeError(range_tmp);
    }
    else{
      setAlbumin("");
      setUseAlbumin(check);
      let form_tmp = lodash.cloneDeep(formError);
      let range_tmp = lodash.cloneDeep(rangeError);
      form_tmp[11] = false;
      range_tmp[4] = false;
      setFormError(form_tmp);
      setRangeError(range_tmp);
    }
  }

  const handleAlbumin = (event : any) => {
    let val = event.target.value.replace(/[^0-9.]/g, "");
    if (val.split('.').length -1 <= 1) {
      setAlbumin(val);
      if(val){
        if(parseFloat(val)<3.5) setHypoalbuminemia(true);
        else setHypoalbuminemia(false); 
      }
      else{
        setHypoalbuminemia(undefined);
      }
    }
  };

  const handleAlbuminFocus = (e: any) => {
    let form_tmp = lodash.cloneDeep(formError);
    let range_tmp = lodash.cloneDeep(rangeError);
    form_tmp[11] = false;
    range_tmp[4] = false;
    setFormError(form_tmp);
    setRangeError(range_tmp);
  }

  const handleAlbuminBlur = (e : any) => {
    let tmp = parseFloat(albumin);

    if (albumin){
      if(tmp<albuminNormalRange[0] || tmp >albuminNormalRange[1] ){
        let form_tmp = lodash.cloneDeep(formError);
        let range_tmp = lodash.cloneDeep(rangeError);
        form_tmp[11] = true;
        range_tmp[4] = true;
        setFormError(form_tmp);
        setRangeError(range_tmp);
      }
      else{
        let form_tmp = lodash.cloneDeep(formError);
        let range_tmp = lodash.cloneDeep(rangeError);
        form_tmp[11] = false;
        range_tmp[4] = false;
        setFormError(form_tmp);
        setRangeError(range_tmp);
      }
    }
  }

// Anemia 관련
  const handleAnemia = (isAnemia : boolean) => {
    let form_tmp = lodash.cloneDeep(formError);
    form_tmp[12] = false;
    setFormError(form_tmp);
    setAnemia(isAnemia);
  };

  const handleUseHemoglobinClick = (check : boolean) => {
    if(check){
      // use Scr to calculate eGFR
      setAnemia(undefined);
      setUseHemoglobin(check);
      let form_tmp = lodash.cloneDeep(formError);
      let range_tmp = lodash.cloneDeep(rangeError);
      form_tmp[12] = false;
      setFormError(form_tmp);
      setRangeError(range_tmp);
    }
    else{
      setHemoglobin("");
      setUseHemoglobin(check);
      let form_tmp = lodash.cloneDeep(formError);
      let range_tmp = lodash.cloneDeep(rangeError);
      form_tmp[13] = false;
      range_tmp[5] = false;
      setFormError(form_tmp);
      setRangeError(range_tmp);
    }
  }

  const handleHemoglobin = (event : any) => {
    let val = event.target.value.replace(/[^0-9.]/g, "");
    if (val.split('.').length -1 <= 1) {
      setHemoglobin(val);
      if(genderValue!==undefined && val){
        if(genderValue){
          if(parseFloat(val)<12) setAnemia(true);
          else setAnemia(false);
        }
        else{
          if(parseFloat(val)<13) setAnemia(true);
          else setAnemia(false);
        }
      }
      else{
        setAnemia(undefined);
      }
    }
  };

  const handleHemoglobinFocus = (e: any) => {
    let form_tmp = lodash.cloneDeep(formError);
    let range_tmp = lodash.cloneDeep(rangeError);
    form_tmp[13] = false;
    range_tmp[5] = false;
    setFormError(form_tmp);
    setRangeError(range_tmp);
  }

  const handleHemoglobinBlur = (e : any) => {
    let tmp = parseFloat(hemoglobin);

    if (hemoglobin){
      if(tmp<hemoglobinNormalRange[0] || tmp >hemoglobinNormalRange[1] ){
        let form_tmp = lodash.cloneDeep(formError);
        let range_tmp = lodash.cloneDeep(rangeError);
        form_tmp[13] = true;
        range_tmp[5] = true;
        setFormError(form_tmp);
        setRangeError(range_tmp);
      }
      else{
        let form_tmp = lodash.cloneDeep(formError);
        let range_tmp = lodash.cloneDeep(rangeError);
        form_tmp[13] = false;
        range_tmp[5] = false;
        setFormError(form_tmp);
        setRangeError(range_tmp);
      }
    }
  }

// Hyponatremia 관련
  const handleHyponatremia = (isHyponatremia : boolean) => {
    let form_tmp = lodash.cloneDeep(formError);
    form_tmp[14] = false;
    setFormError(form_tmp);
    setHyponatremia(isHyponatremia);
  };

  const handleUseSodiumClick = (check : boolean) => {
    if(check){
      setHyponatremia(undefined);
      setUseSodium(check);
      let form_tmp = lodash.cloneDeep(formError);
      let range_tmp = lodash.cloneDeep(rangeError);
      form_tmp[14] = false;
      setFormError(form_tmp);
      setRangeError(range_tmp);
    }
    else{
      setSodium("");
      setUseSodium(check);
      let form_tmp = lodash.cloneDeep(formError);
      let range_tmp = lodash.cloneDeep(rangeError);
      form_tmp[15] = false;
      range_tmp[6] = false;
      setFormError(form_tmp);
      setRangeError(range_tmp);
    }
  }

  const handleSodium = (event : any) => {
    let val = event.target.value.replace(/[^0-9.]/g, "");
    if (val.split('.').length -1 <= 1) {
      setSodium(val);
      if(val){
        if(parseFloat(val)<135) setHyponatremia(true);
        else setHyponatremia(false);
      }
      else{
        setHyponatremia(undefined);
      }
    }
  };

  const handleSodiumFocus = (e: any) => {
    let form_tmp = lodash.cloneDeep(formError);
    let range_tmp = lodash.cloneDeep(rangeError);
    form_tmp[15] = false;
    range_tmp[6] = false;
    setFormError(form_tmp);
    setRangeError(range_tmp);
  }

  const handleSodiumBlur = (e : any) => {
    let tmp = parseFloat(sodium);

    if (sodium){
      if(tmp<sodiumNormalRange[0] || tmp >sodiumNormalRange[1] ){
        let form_tmp = lodash.cloneDeep(formError);
        let range_tmp = lodash.cloneDeep(rangeError);
        form_tmp[15] = true;
        range_tmp[6] = true;
        setFormError(form_tmp);
        setRangeError(range_tmp);
      }
      else{
        let form_tmp = lodash.cloneDeep(formError);
        let range_tmp = lodash.cloneDeep(rangeError);
        form_tmp[15] = false;
        range_tmp[6] = false;
        setFormError(form_tmp);
        setRangeError(range_tmp);
      }
    }
  }

// AKI stage 관련
  const handleAKIStage = (akiStage : number) => {
    let form_tmp = lodash.cloneDeep(formError);
    form_tmp[16] = false;
    setFormError(form_tmp);
    setAkiStageValue(akiStage);
  }

  const handleUsePostOPScrClick = (check : boolean) => {
    if(check){
      // use Scr to calculate eGFR
      setAkiStageValue(undefined);
      setUsePostOPScr(check);
      let form_tmp = lodash.cloneDeep(formError);
      let range_tmp = lodash.cloneDeep(rangeError);
      form_tmp[16] = false;
      setFormError(form_tmp);
      setRangeError(range_tmp);
    }
    else{
      setPostOPScr("");
      setPostOPScrFloat(undefined);
      setCalculatedAKIStage(undefined);
      setUsePostOPScr(check);
      let form_tmp = lodash.cloneDeep(formError);
      let range_tmp = lodash.cloneDeep(rangeError);
      form_tmp[17] = false;
      range_tmp[7] = false;
      setFormError(form_tmp);
      setRangeError(range_tmp);
    }
  }

  // Post OP Scr 관련
  const handlePostOPScrUnit = (unit : boolean) => {
    if(unit === false) {
      if(postscrUnitValue && postOPScrFloat) {
        try {
          let tmp = postOPScrFloat/88.42;
          if ( tmp<scrmgNormalRange[0] || tmp>scrmgNormalRange[1]) {
            let form_tmp = lodash.cloneDeep(formError);
            let range_tmp = lodash.cloneDeep(rangeError);
            form_tmp[17] = true;
            range_tmp[7] = true;
            setFormError(form_tmp);
            setRangeError(range_tmp);
          }
          else {
            let form_tmp = lodash.cloneDeep(formError);
            let range_tmp = lodash.cloneDeep(rangeError);
            form_tmp[17] = false;
            range_tmp[7] = false;
            setFormError(form_tmp);
            setRangeError(range_tmp);
          }
          setPostOPScrFloat(tmp);
          setPostOPScr(String(tmp.toFixed(2)));
        } catch(error){
          console.log(error);
          alert(error);
        }
      }
      setPostScrUnitValue(false);
    }
    else {
      if(!postscrUnitValue && postOPScrFloat) {
        try {
          let tmp = postOPScrFloat*88.42;
          if (tmp<scrumolNormalRange[0] || tmp>scrumolNormalRange[1]){
            let form_tmp = lodash.cloneDeep(formError);
            let range_tmp = lodash.cloneDeep(rangeError);
            form_tmp[17] = true;
            range_tmp[7] = true;
            setFormError(form_tmp);
            setRangeError(range_tmp);
          }
          else {
            let form_tmp = lodash.cloneDeep(formError);
            let range_tmp = lodash.cloneDeep(rangeError);
            form_tmp[17] = false;
            range_tmp[7] = false;
            setFormError(form_tmp);
            setRangeError(range_tmp);
          }
          setPostOPScrFloat(tmp);
          setPostOPScr(String(tmp.toFixed(2)));
        } catch(error){
          console.log(error);
          alert(error);
        }
      }
      setPostScrUnitValue(true);
    }
  };

  const handlePostOPScr = (event : any) => {
    let val = event.target.value.replace(/[^0-9.]/g, "");
    if (val.split('.').length -1 <= 1) {
      setPostOPScr(val);
      let tmp = parseFloat(val);
      setPostOPScrFloat(tmp);
    }
  };

  const handlePostOPScrFocus = (e: any) => {
    let form_tmp = lodash.cloneDeep(formError);
    let range_tmp = lodash.cloneDeep(rangeError);
    form_tmp[17] = false;
    range_tmp[7] = false;
    setFormError(form_tmp);
    setRangeError(range_tmp);
  }

  const handlePostOPScrBlur = (e : any) => {
    let tmp = parseFloat(postOPScr);
    if (postOPScr){
      if (!postscrUnitValue){
        if(tmp<scrmgNormalRange[0] || tmp>scrmgNormalRange[1]){
          let form_tmp = lodash.cloneDeep(formError);
          let range_tmp = lodash.cloneDeep(rangeError);
          form_tmp[17] = true;
          range_tmp[7] = true;
          setFormError(form_tmp);
          setRangeError(range_tmp);
        }
        else{
          let form_tmp = lodash.cloneDeep(formError);
          let range_tmp = lodash.cloneDeep(rangeError);
          form_tmp[17] = false;
          range_tmp[7] = false;
          setFormError(form_tmp);
          setRangeError(range_tmp);
        }
      }
      else{
        if(tmp<scrumolNormalRange[0] || tmp>scrumolNormalRange[1]){
          let form_tmp = lodash.cloneDeep(formError);
          let range_tmp = lodash.cloneDeep(rangeError);
          form_tmp[17] = true;
          range_tmp[7] = true;
          setFormError(form_tmp);
          setRangeError(range_tmp);
        }
        else{
          let form_tmp = lodash.cloneDeep(formError);
          let range_tmp = lodash.cloneDeep(rangeError);
          form_tmp[17] = false;
          range_tmp[7] = false;
          setFormError(form_tmp);
          setRangeError(range_tmp);
        }
      }
    }
  }

  // Malignancy history 관련

  const handleMalHistory = (mal : boolean) => {
    let form_tmp = lodash.cloneDeep(formError);
    form_tmp[18] = false;
    setFormError(form_tmp);
    setMalhistory(mal);
  };

  function calculateScore(isAdditional:boolean) {
    if (age === undefined || age === null || age === ""){
      let form_tmp = lodash.cloneDeep(formError);
      form_tmp[0] = true;
      setFormError(form_tmp);
      alert("Please Check Age Value");
      return;
    }
    else if (genderValue === undefined || genderValue === null){
      let form_tmp = lodash.cloneDeep(formError);
      form_tmp[1] = true;
      setFormError(form_tmp);
      alert("Please Check Sex Value");
      return;
    }
    else if (!useScr && (egfr === undefined || egfr === null || egfr === "")){
      let form_tmp = lodash.cloneDeep(formError);
      form_tmp[2] = true;
      setFormError(form_tmp);
      alert("Please Check eGFR Value");
      return;
    }
    else if (useScr && (scr === undefined || scr === null || scr === "")){
      let form_tmp = lodash.cloneDeep(formError);
      form_tmp[3] = true;
      setFormError(form_tmp);
      alert("Please Check Preoperative Serum Creatinine Value");
      return;
    }
    else if (useScr && (ethValue === undefined || scr === null)){
      let form_tmp = lodash.cloneDeep(formError);
      form_tmp[4] = true;
      setFormError(form_tmp);
      alert("Please Check Ethnicity Value");
      return;
    }
    else if (dipstickAlbuminuria === undefined || dipstickAlbuminuria === null ){
      let form_tmp = lodash.cloneDeep(formError);
      form_tmp[5] = true;
      setFormError(form_tmp);
      alert("Please Check Dipstick Albuminuria Value");
      return;
    }
    else if (surgDuration === undefined || surgDuration === null || surgDuration === ""){
      let form_tmp = lodash.cloneDeep(formError);
      form_tmp[6] = true;
      setFormError(form_tmp);
      alert("Please Check Expected Surgical Duration Value");
      return;
    }
    else if (emergency === undefined || emergency === null){
      let form_tmp = lodash.cloneDeep(formError);
      form_tmp[7] = true;
      setFormError(form_tmp);
      alert("Please Check Emergency Operation Value");
      return;
    }
    else if (diabetesMellitus === undefined || diabetesMellitus === null){
      let form_tmp = lodash.cloneDeep(formError);
      form_tmp[8] = true;
      setFormError(form_tmp);
      alert("Please Check Diabetes Mellitus Value");
      return;
    }
    else if (blockAdeUsage === undefined || blockAdeUsage === null){
      let form_tmp = lodash.cloneDeep(formError);
      form_tmp[9] = true;
      setFormError(form_tmp);
      alert("Please Check RAAS Blockade Use Value");
      return;
    }
    else if (!useAlbumin && (hypoalbuminemia === undefined || hypoalbuminemia === null)){
      let form_tmp = lodash.cloneDeep(formError);
      form_tmp[10] = true;
      setFormError(form_tmp);
      alert("Please Check Hypoalbuminemia Value");
      return;
    }
    else if (useAlbumin && (albumin === undefined || albumin === null || albumin === "")){
      let form_tmp = lodash.cloneDeep(formError);
      form_tmp[11] = true;
      setFormError(form_tmp);
      alert("Please Check Albumin Value");
      return;
    }
    else if (!useHemoglobin && (anemia === undefined || anemia === null)){
      let form_tmp = lodash.cloneDeep(formError);
      form_tmp[12] = true;
      setFormError(form_tmp);
      alert("Please Check Anemia Value");
      return;
    }
    else if (useHemoglobin && (hemoglobin === undefined || hemoglobin === null || hemoglobin === "")){
      let form_tmp = lodash.cloneDeep(formError);
      form_tmp[13] = true;
      setFormError(form_tmp);
      alert("Please Check Hemoglobin Value");
      return;
    }
    else if (!useSodium && (hyponatremia === undefined || hyponatremia === null)){
      let form_tmp = lodash.cloneDeep(formError);
      form_tmp[14] = true;
      setFormError(form_tmp);
      alert("Please Check Hyponatremia Value");
      return;
    }
    else if (useSodium && (sodium === undefined || sodium === null || sodium === "")){
      let form_tmp = lodash.cloneDeep(formError);
      form_tmp[15] = true;
      setFormError(form_tmp);
      alert("Please Check Sodium Value");
      return;
    }
    if(!isAdditional){
      calculateSparkScore(isAdditional);
      setIsScoreOn(true);
    }
    else{
      calculateSparkScore(isAdditional);
      setIsAdditionalScoreOn(true);
    }
  }

  function calculateSparkScore(isAdditional:boolean){
    let patient_data: patientData;
    let age_tmp: number;
    let eGFR_tmp: number;
    let hypoalbuminemia_tmp: boolean|undefined;
    let anemia_tmp: boolean|undefined;
    let hyponatremia_tmp: boolean|undefined;
    let final_score_calculated = 0;

    try{
      // Age score
      age_tmp = parseInt(age);
      if(age_tmp>=40 && age_tmp<60) final_score_calculated += 6;
      else if(age_tmp>=60 && age_tmp<80) final_score_calculated += 9;
      else if(age_tmp>=80) final_score_calculated += 13;

      // Gender score
      if(!genderValue) final_score_calculated += 8;

      // eGFR Score
      if(!useScr) eGFR_tmp = parseFloat(egfr);
      else eGFR_tmp = parseFloat(calculatedEgfr);

      if(eGFR_tmp>=45 && eGFR_tmp<60) final_score_calculated += 8;
      else if(eGFR_tmp>=30 && eGFR_tmp<45) final_score_calculated += 15;
      else if(eGFR_tmp>=15 && eGFR_tmp<30) final_score_calculated += 22;

      // Dipstik albuminuria Score
      if(dipstickAlbuminuria) final_score_calculated += 6;

      // Surgical Duration Score
      final_score_calculated += parseFloat(surgDuration) * 5;

      // Emergency Operation Score
      if(emergency) final_score_calculated += 7;

      // Diabetes Mellitus Score
      if(diabetesMellitus) final_score_calculated += 4;

      // RAAS blockade Use Score
      if(blockAdeUsage) final_score_calculated += 6;

      // Hypoalbuminemia Score
      if(!useAlbumin){
        hypoalbuminemia_tmp = hypoalbuminemia;
      }
      else{
        if(parseFloat(albumin)<3.5) hypoalbuminemia_tmp = true;
        else hypoalbuminemia_tmp = false;
      }
      if(hypoalbuminemia_tmp) final_score_calculated += 8;

      // Anemia Score
      if(!useHemoglobin){
        anemia_tmp = anemia;
      }
      else{
        if(genderValue){
          if(parseFloat(hemoglobin)<12) anemia_tmp = true;
          else anemia_tmp = false;
        }
        else{
          if(parseFloat(hemoglobin)<13) anemia_tmp = true;
          else anemia_tmp = false;
        }
      }
      if(anemia_tmp) final_score_calculated += 4;

      // Hyponatremia Score
      if(!useSodium){
        hyponatremia_tmp = hyponatremia;
      }
      else{
        if(parseFloat(sodium)<135) hyponatremia_tmp = true;
        else hyponatremia_tmp = false;
      }
      if(hyponatremia_tmp) final_score_calculated += 3;
    } catch (error) {
      console.log(error);
      alert(error);
      return;
    }
    setFinalScore(final_score_calculated);

    patient_data = {
      age: age_tmp,
      gender: genderValue,
      eGFR: eGFR_tmp,
      albuminuria: dipstickAlbuminuria,
      surgicalDuration: parseFloat(surgDuration),
      emergencyOP: emergency,
      diabetesMellitus: diabetesMellitus,
      blockadeUsage: blockAdeUsage,
      hypoalbuminemia: hypoalbuminemia_tmp,
      anemia: anemia_tmp,
      hyponatremia: hyponatremia_tmp
    }
    if(!isAdditional) calculateRiskScore(patient_data);
    else calculateAdditionalRiskScore(patient_data);
  }

  function calculateRiskScore(p_data: patientData) {
    let one_year_mort;
    let one_year_mort_lin;
    let three_year_mort;
    let three_year_mort_lin;
    let baseline_hzd_one_year;
    let baseline_hzd_three_year;

    let one_year_coef = {
      age: 0.0241099,
      sex: -0.2356511,
      dm: -0.0021923,
      rasb: -0.1890251,
      surgdur: 0.0015267,
      emerg: 0.4618001,
      egfr8: -0.0400773,
      egfr15: 0.0528730,
      egfr22: 0.0965942,
      hypoalbu: 0.6073256,
      anem: 0.8941788,
      hypona: 0.6171511,
      ualb: 0.4894131
    }
    let three_year_coef = {
      age: 0.0249006,
      sex: -0.3206235,
      dm: 0.0531448,
      rasb: -0.1542438,
      surgdur: 0.0018435,
      emerg: 0.2797006,
      egfr8: -0.0163331,
      egfr15: 0.0259797,
      egfr22: 0.0692921,
      hypoalbu: 0.4367481,
      anem: 0.7569366,
      hypona: 0.4492856,
      ualb: 0.3735130
    }

    let one_year_egfr_coef = one_year_coef.egfr8;
    let three_year_egfr_coef = three_year_coef.egfr8;

    if(p_data.eGFR>=45 && p_data.eGFR<60) {
      one_year_egfr_coef = one_year_coef.egfr8;
      three_year_egfr_coef = three_year_coef.egfr8;
    }
    else if(p_data.eGFR>=30 && p_data.eGFR<45) {
      one_year_egfr_coef = one_year_coef.egfr15;
      three_year_egfr_coef = three_year_coef.egfr15;
    }
    else if(p_data.eGFR>=15 && p_data.eGFR<30) {
      one_year_egfr_coef = one_year_coef.egfr22;
      three_year_egfr_coef = three_year_coef.egfr22;
    }
    else {
      one_year_egfr_coef = 0;
      three_year_egfr_coef = 0;
    }

    let age_mean = 57.19821;
    let op_dur_mean = 185.306;
    //let op_dur_final = (p_data.surgicalDuration*60 > op_dur_mean) ? p_data.surgicalDuration*60-op_dur_mean : op_dur_mean - p_data.surgicalDuration*60;
    //let age_final = (p_data.age > age_mean) ? p_data.age-age_mean : age_mean - p_data.age;

    let op_dur_final = (p_data.surgicalDuration*60 - op_dur_mean);
    let age_final = (p_data.age - age_mean) ;
    one_year_mort_lin = age_final*one_year_coef.age + Number(p_data.gender)*one_year_coef.sex + Number(p_data.diabetesMellitus)*one_year_coef.dm + 
    Number(p_data.blockadeUsage)*one_year_coef.rasb + op_dur_final*one_year_coef.surgdur + Number(p_data.emergencyOP)*one_year_coef.emerg + 
    one_year_egfr_coef + Number(p_data.hypoalbuminemia)*one_year_coef.hypoalbu + Number(p_data.anemia)*one_year_coef.anem + Number(p_data.hyponatremia)*one_year_coef.hypona + Number(p_data.albuminuria)*one_year_coef.ualb;

    three_year_mort_lin = age_final*three_year_coef.age + Number(p_data.gender)*three_year_coef.sex + Number(p_data.diabetesMellitus)*three_year_coef.dm + 
    Number(p_data.blockadeUsage)*three_year_coef.rasb + op_dur_final*three_year_coef.surgdur + Number(p_data.emergencyOP)*three_year_coef.emerg + 
    three_year_egfr_coef + Number(p_data.hypoalbuminemia)*three_year_coef.hypoalbu + Number(p_data.anemia)*three_year_coef.anem + Number(p_data.hyponatremia)*three_year_coef.hypona + Number(p_data.albuminuria)*three_year_coef.ualb;
    baseline_hzd_one_year = 0.0287365119866271;
    baseline_hzd_three_year = 0.0922879473803097;
    
    console.log(one_year_mort_lin);
    console.log(three_year_mort_lin);
    one_year_mort = (1 - (Math.exp(-baseline_hzd_one_year)**Math.exp(one_year_mort_lin)))*100;
    three_year_mort = (1 - (Math.exp(-baseline_hzd_three_year)**Math.exp(three_year_mort_lin)))*100;
    console.log(one_year_mort);
    console.log(three_year_mort);
    setOneyearMortalityProbability(one_year_mort);
    setThreeyearMortalityProbability(three_year_mort);
  }

  function calculateAdditionalRiskScore(p_data: patientData) {
    let one_year_mort;
    let one_year_mort_lin;
    let three_year_mort;
    let three_year_mort_lin;
    let baseline_hzd_one_year;
    let baseline_hzd_three_year;

    let one_year_coef = {
      age: 0.0196126,
      sex: -0.054664,
      dm: -0.0349731,
      rasb: -0.0981915,
      surgdur: 0.0006001,
      emerg: 0.546191,
      egfr8: 0.0402695,
      egfr15: 0.0715869,
      egfr22: 0.1395399,
      hypoalbu: 0.6227342,
      anem: 0.7720146,
      hypona: 0.6238469,
      ualb: 0.4993756,
      malhis: 1.0364631
    }
    let three_year_coef = {
      age: 0.0194696,
      sex: -0.1168888,
      dm: 0.0325275,
      rasb: -0.0427398,
      surgdur: 0.0011717,
      emerg: 0.3848941,
      egfr8: 0.1071924,
      egfr15: 0.1138894,
      egfr22: 0.1885805,
      hypoalbu: 0.4847846,
      anem: 0.6315236,
      hypona: 0.4831959,
      ualb: 0.4029291,
      malhis: 1.1817547
    }
    let one_year_egfr_coef = one_year_coef.egfr8;
    let three_year_egfr_coef = three_year_coef.egfr8;
    if(p_data.eGFR>=45 && p_data.eGFR<60) {
      one_year_egfr_coef = one_year_coef.egfr8;
      three_year_egfr_coef = three_year_coef.egfr8;
    }
    else if(p_data.eGFR>=30 && p_data.eGFR<45) {
      one_year_egfr_coef = one_year_coef.egfr15;
      three_year_egfr_coef = three_year_coef.egfr15;
    }
    else if(p_data.eGFR>=15 && p_data.eGFR<30) {
      one_year_egfr_coef = one_year_coef.egfr22;
      three_year_egfr_coef = three_year_coef.egfr22;
    }
    else {
      one_year_egfr_coef = 0;
      three_year_egfr_coef = 0;
    }

    let aki = usePostOPScr ? calculatedAKIStage: akiStageValue;
    let age_mean = 57.19821;
    let op_dur_mean = 185.306;
    // let aki_stage_mean = 0.08194;
    let op_dur_final = (p_data.surgicalDuration*60 - op_dur_mean);
    let age_final = (p_data.age - age_mean);
    let one_year_akistage_coef = 0;
    let three_year_akistage_coef = 0;
    if(Number(aki) === 1){
      one_year_akistage_coef = 0.4728895;
      three_year_akistage_coef = 0.2954947;
    }
    else if(Number(aki) === 2){
      one_year_akistage_coef = 0.7688407;
      three_year_akistage_coef = 0.4481515;
    }
    else if(Number(aki) === 3){
      one_year_akistage_coef = 1.4154315;
      three_year_akistage_coef = 1.1222658;
    }

    // let aki_stage_final = (Number(aki) - aki_stage_mean);
    let aki_stage_final = Number(aki);

    
    one_year_mort_lin = age_final*one_year_coef.age + Number(p_data.gender)*one_year_coef.sex + Number(p_data.diabetesMellitus)*one_year_coef.dm + 
    Number(p_data.blockadeUsage)*one_year_coef.rasb + op_dur_final*one_year_coef.surgdur + Number(p_data.emergencyOP)*one_year_coef.emerg + 
    one_year_egfr_coef + Number(p_data.hypoalbuminemia)*one_year_coef.hypoalbu + Number(p_data.anemia)*one_year_coef.anem + Number(p_data.hyponatremia)*one_year_coef.hypona + Number(p_data.albuminuria)*one_year_coef.ualb + 
    aki_stage_final*one_year_akistage_coef + Number(malhistory)*one_year_coef.malhis;
    
    three_year_mort_lin = age_final*three_year_coef.age + Number(p_data.gender)*three_year_coef.sex + Number(p_data.diabetesMellitus)*three_year_coef.dm + 
    Number(p_data.blockadeUsage)*three_year_coef.rasb + op_dur_final*three_year_coef.surgdur + Number(p_data.emergencyOP)*three_year_coef.emerg + 
    three_year_egfr_coef + Number(p_data.hypoalbuminemia)*three_year_coef.hypoalbu + Number(p_data.anemia)*three_year_coef.anem + Number(p_data.hyponatremia)*three_year_coef.hypona + Number(p_data.albuminuria)*three_year_coef.ualb + 
    aki_stage_final*three_year_akistage_coef + Number(malhistory)*three_year_coef.malhis;
    baseline_hzd_one_year = 0.01457754;
    baseline_hzd_three_year = 0.0440209105958078;

    console.log(one_year_mort_lin);
    console.log(three_year_mort_lin);
    one_year_mort = (1 - (Math.exp(-baseline_hzd_one_year)**Math.exp(one_year_mort_lin)))*100;
    three_year_mort = (1 - (Math.exp(-baseline_hzd_three_year)**Math.exp(three_year_mort_lin)))*100;
    setOneyearMortalityProbabilityAdditional(one_year_mort);
    setThreeyearMortalityProbabilityAdditional(three_year_mort);
  }

  function calculateeGFR_from_SCr(scr:number, age:number, gender:boolean, eth:boolean) {
    let eGFR_tmp;
    if(!gender){
      const k = 0.9;
      const a = -0.411;
      if(!ethValue) eGFR_tmp = 141*(Math.min(scr/k, 1)**a)*(Math.max(scr/k, 1)**(-1.209))*(0.993**age);
      else eGFR_tmp = 141*(Math.min(scr/k, 1)**a)*(Math.max(scr/k, 1)**(-1.209))*(0.993**age)*1.159;
    }
    else{
      const k = 0.7;
      const a = -0.329;
      if(!ethValue) eGFR_tmp = 141*(Math.min(scr/k, 1)**a)*(Math.max(scr/k, 1)**(-1.209))*(0.993**age)*1.018;
      else eGFR_tmp = 141*(Math.min(scr/k, 1)**a)*(Math.max(scr/k, 1)**(-1.209))*(0.993**age)*1.018*1.159;
    }
    return eGFR_tmp;
  }

  useEffect(() => {
    if(scrFloat!==undefined && age!==undefined && genderValue!==undefined && ethValue!==undefined){
      let age_tmp = parseInt(age);
      let tmp = scrFloat;
      let eGFR_tmp;
      if(scrUnitValue) tmp = tmp/88.42;
      
      eGFR_tmp = calculateeGFR_from_SCr(tmp, age_tmp, genderValue, ethValue);

      if(eGFR_tmp) setCalculatedEgfr(String(eGFR_tmp.toFixed(2)));
      else setCalculatedEgfr("");

      if(usePostOPScr && postOPScrFloat!==undefined){
        let tmp_post = postOPScrFloat;
        if(postscrUnitValue) tmp_post = tmp_post/88.42;
        if (tmp_post>4 || tmp_post>=tmp*3) setCalculatedAKIStage(3);
        else if(tmp_post>=tmp*2) setCalculatedAKIStage(2);
        else if(tmp_post>=tmp+0.3 || tmp_post>=tmp*1.5) setCalculatedAKIStage(1);
      }
      else {
        setCalculatedAKIStage(undefined);
      }
    }
    else {
      setCalculatedEgfr("");
    }

    // if(isScoreOn){
    //   if((age!==undefined) && (genderValue!==undefined) && ((!useScr&&egfr!==undefined) || (useScr && calculatedEgfr!==undefined && calculatedEgfr!=="")) 
    //   && (dipstickAlbuminuria!==undefined) && (surgDuration!==undefined) && (emergency!==undefined) && (diabetesMellitus!==undefined) && (blockAdeUsage!==undefined) && ((!useAlbumin&&hypoalbuminemia!==undefined) || (useAlbumin&&albumin!==undefined))
    //   && ((!useHemoglobin && anemia!==undefined) || (useHemoglobin && hemoglobin!==undefined)) && ((!useSodium && hyponatremia!==undefined) || (useSodium && sodium!==undefined)) && ((!usePostOPScr && akiStageValue!==undefined) || (usePostOPScr && postOPScr!==undefined)) && malhistory!==undefined){
    //     let one_year_mort;
    //     let one_year_mort_lin;
    //     let three_year_mort;
    //     let three_year_mort_lin;
    //     let one_year_coef = {
    //       age: 0.0196293,
    //       sex: -0.0568409,
    //       dm: -0.0338757,
    //       rasb: -0.0987812,
    //       surgdur: 0.0006098,
    //       emerg: 0.5448388,
    //       egfr8: 0.0445636,
    //       egfr15: 0.0723537,
    //       egfr22: 0.1554711,
    //       hypoalbu: 0.6243594,
    //       anem: 0.7719842,
    //       hypona: 0.6230601,
    //       ualb: 0.4982252,
    //       akistage: 0.4467841,
    //       malhis: 1.0364368
    //     }
  
    //     let three_year_coef = {
    //       age: 0.0194704,
    //       sex: -0.1176325,
    //       dm: 0.0319976,
    //       rasb: -0.0438577,
    //       surgdur: 0.0011574,
    //       emerg: 0.3831032,
    //       egfr8: 0.1077451,
    //       egfr15: 0.1070112,
    //       egfr22: 0.1894516,
    //       hypoalbu: 0.4847653,
    //       anem: 0.6314451,
    //       hypona: 0.4797904,
    //       ualb: 0.4016427,
    //       akistage: 0.3002817,
    //       malhis: 1.1821093
    //     }
  
    //     let one_year_egfr_coef = one_year_coef.egfr8;
    //     let three_year_egfr_coef = three_year_coef.egfr8;

    //     let eGFR_tmp;
    //     if(!useScr) eGFR_tmp = parseFloat(egfr);
    //     else eGFR_tmp = parseFloat(calculatedEgfr);
  
    //     if(eGFR_tmp>=45 && eGFR_tmp<60) {
    //       one_year_egfr_coef = one_year_coef.egfr8;
    //       three_year_egfr_coef = three_year_coef.egfr8;
    //     }
    //     else if(eGFR_tmp>=30 && eGFR_tmp<45) {
    //       one_year_egfr_coef = one_year_coef.egfr15;
    //       three_year_egfr_coef = three_year_coef.egfr15;
    //     }
    //     else if(eGFR_tmp>=15 && eGFR_tmp<30) {
    //       one_year_egfr_coef = one_year_coef.egfr22;
    //       three_year_egfr_coef = three_year_coef.egfr22;
    //     }
    //     let age_tmp = parseInt(age);

    //     let hypoalbuminemia_tmp;
    //     if(!useAlbumin){
    //       hypoalbuminemia_tmp = hypoalbuminemia;
    //     }
    //     else{
    //       if(parseFloat(albumin)<3.5) hypoalbuminemia_tmp = true;
    //       else hypoalbuminemia_tmp = false;
    //     }

    //     let anemia_tmp;
    //     if(!useHemoglobin){
    //       anemia_tmp = anemia;
    //     }
    //     else{
    //       if(genderValue){
    //         if(parseFloat(hemoglobin)<12) anemia_tmp = true;
    //         else anemia_tmp = false;
    //       }
    //       else{
    //         if(parseFloat(hemoglobin)<13) anemia_tmp = true;
    //         else anemia_tmp = false;
    //       }
    //     }

    //     let hyponatremia_tmp;
    //     if(!useSodium){
    //       hyponatremia_tmp = hyponatremia;
    //     }
    //     else{
    //       if(parseFloat(sodium)<135) hyponatremia_tmp = true;
    //       else hyponatremia_tmp = false;
    //     }
    //     let aki = usePostOPScr ? calculatedAKIStage: akiStageValue;
  
    //     one_year_mort_lin = age_tmp*one_year_coef.age + Number(!genderValue)*one_year_coef.sex + Number(diabetesMellitus)*one_year_coef.dm + 
    //     Number(blockAdeUsage)*one_year_coef.rasb + parseFloat(surgDuration)*one_year_coef.surgdur + Number(emergency)*one_year_coef.emerg + 
    //     one_year_egfr_coef + Number(hypoalbuminemia_tmp)*one_year_coef.hypoalbu + Number(anemia_tmp)*one_year_coef.anem + Number(hyponatremia_tmp)*one_year_coef.hypona + Number(dipstickAlbuminuria)*one_year_coef.ualb + 
    //     Number(aki)*one_year_coef.akistage + Number(malhistory)*one_year_coef.malhis;
        
    //     three_year_mort_lin = age_tmp*three_year_coef.age + Number(!genderValue)*three_year_coef.sex + Number(diabetesMellitus)*three_year_coef.dm + 
    //     Number(blockAdeUsage)*three_year_coef.rasb + parseFloat(surgDuration)*three_year_coef.surgdur + Number(emergency)*three_year_coef.emerg + 
    //     three_year_egfr_coef + Number(hypoalbuminemia_tmp)*three_year_coef.hypoalbu + Number(anemia_tmp)*three_year_coef.anem + Number(hyponatremia_tmp)*three_year_coef.hypona + Number(dipstickAlbuminuria)*three_year_coef.ualb + 
    //     Number(aki)*three_year_coef.akistage + Number(malhistory)*three_year_coef.malhis;

    //     let baseline_hzd_one_year = 0.00429782164765366;
    //     let baseline_hzd_three_year = 0.0113806045901904;

    //     one_year_mort = (1 - (Math.exp(-baseline_hzd_one_year)**Math.exp(one_year_mort_lin)))*100;
    //     three_year_mort = (1 - (Math.exp(-baseline_hzd_three_year)**Math.exp(three_year_mort_lin)))*100;
    //     setOneyearMortalityProbability(one_year_mort);
    //     setThreeyearMortalityProbability(three_year_mort);
    //   }
    // }
  }, [scrFloat, age, genderValue, ethValue, postOPScrFloat, usePostOPScr, akiStageValue, malhistory]);

  return (
    <div className="App">
      <Header content_maxheight={2.2}>
        <div style={{display:'flex', flexDirection:'row', alignSelf:'center', alignItems:'center', height: '100%', width:'100%',minWidth:'420px', whiteSpace:'pre-line'}}>
          <div style={{width:'15%', maxWidth:'160px'}}>
            <div className='logo'></div>
          </div>
          <div style={{display:'flex', flexDirection:'column', alignItems:'flex-start', width:'100%'}}>
            <div style={{color:'#004C99', fontFamily:'NeoB', fontSize:'1rem'}}>SPARK classification</div>
            <div style={{color:'#004C99', fontFamily:'NeoM', fontSize:'1rem', textAlign:'left'}}>for postoperative AKI risk prediction based on preoperative factors with extended prediction for long-term prognosis in non-cardiac surgery</div>
          </div>
        </div>
      </Header>
      <div className='Main'>
        <div className='patient-row'>
          <div className='patient-innercol'>
            <p style={{marginTop:'1rem', fontFamily:'NeoB', fontSize:'1.5rem'}}>Preoperative risk factors</p>
            <div className='calculator'>
              <div className='patient-input'>
                <Form.Label> Age </Form.Label>
                <div className='right-aligned'>
                  <div style={{width:'65%', display:'flex', flexDirection:'column', alignItems:'flex-start'}}>
                    <Form.Control className={(formError[0]) ? 'form-control-error' : ''} placeholder='Enter Age' value={age} style={{fontSize:'1rem'}} onFocus={(e) => {handleAgeFocus(e)}} onBlur={(e) => {handleAgeBlur(e)}} onChange={(e) => {handleAge(e)}} required/>
                    {rangeError[0]&&(<div className='oor-text'>Out of range! ({ageNormalRange[0]}~{ageNormalRange[1]})</div>)}
                  </div>
                  <div className='unitbox'>
                    <Form.Text style={{fontSize:'0.8rem'}}> (years) </Form.Text>
                  </div>
                </div>
              </div>
              <div className='patient-input'>
                <Form.Label> Sex </Form.Label>
                <div className='right-aligned'>
                  <div className={(formError[1])? "outline":"nooutline"}>
                    <Button variant={(genderValue !== undefined && !genderValue)? 'leftchecked': 'left'} style={{fontSize:'0.8rem'}} onClick={()=> {handleSex(false)}}>Male</Button>
                    <Button variant={(genderValue !== undefined && genderValue)? 'rightchecked': 'right'} style={{fontSize:'0.8rem'}} onClick={()=> {handleSex(true)}}>Female</Button>
                  </div>
                </div>
              </div>
              <div className='patient-input-flexcol' id={useScr? "pinput-egfr" : "pinput-egfr-sm"}>
                <div style={{display:'flex', flexDirection:'row', width:'100%', justifyContent:'space-between', alignItems:'flex-start'}}>
                  <Form.Label> eGFR </Form.Label>
                  <div style={{display:'flex', flexDirection:'column', height:'100%', width:'70%', justifyContent:'space-between'}}>
                    <div className='right-aligned' style={{width:'100%', height:'25%', alignItems:'flex-start'}}>
                      <div style={{width:'65%', display:'flex', flexDirection:'column', alignItems:'flex-start'}}>
                        <Form.Control className={(formError[2]) ? 'form-control-error' : ''} placeholder='Enter eGFR' value={egfr} style={{width:'100%', fontSize:'1rem'}} onFocus={(e) => {handleEGFRFocus(e)}} onBlur={(e) => {handleEGFRBlur(e)}} onChange={(e) => {handleEgfr(e)}} disabled={useScr}/>
                        {rangeError[1]&&(<div className='oor-text'>Out of range! ({eGFRNormalRange[0]}~{eGFRNormalRange[1]})</div>)}
                      </div>
                      <div className='unitbox'>
                        <Form.Text style={{fontSize:'0.8rem', margin:'0', whiteSpace:'pre-wrap'}}> (mL/min/1.73 m²)</Form.Text>
                      </div>
                    </div>
                  </div>
                </div>
                <Button variant='nooutline' onClick={() => {handleUseScrClick(!useScr)}}>{useScr? "Click to calculate eGFR based on creatinine values ▲" : "Click to calculate eGFR based on creatinine values ▼"}</Button>
                  {useScr && 
                  (<>
                  <div className='right-aligned' style={{width:'100%', height:'30%', alignItems:'flex-start', marginBottom:'4px'}}>
                    <div style={{display:'flex', flexDirection:'column', width:'65%', alignItems:'flex-start'}}>
                      <div style={{fontFamily:'NeoM', textAlign:'left', color:'gray'}}>Serum Creatinine</div>
                        <Form.Control className={(formError[3]) ? 'form-control-error' : ''} placeholder='Enter Serum Creatinine' value={scr} style={{width:'100%'}} onFocus={(e) => {handleScrFocus(e)}} onBlur={(e)=>{handleScrBlur(e)}} onChange={(e) => {handleScr(e)}}/>
                        {rangeError[2]&&(<div className='oor-text'>{!scrUnitValue? `Out of range! (${scrmgNormalRange[0]}~${scrmgNormalRange[1]})`: `Out of range! (${scrumolNormalRange[0]}~${scrumolNormalRange[1]})`}</div>)}
                    </div>
                    <div className='unitbox' style={{marginTop:'1.5rem'}}>
                      <div style={{width:'70%', minWidth:'76px'}}>
                        <Button variant={(scrUnitValue !== undefined && !scrUnitValue)? 'leftcheckedsm': 'leftsm'} style={{fontSize:'0.8rem'}} onClick={()=> {handleScrUnit(false);}}>mg/dL</Button>
                        <Button variant={(scrUnitValue !== undefined && scrUnitValue)? 'rightcheckedsm': 'rightsm'} style={{fontSize:'0.8rem'}} onClick={()=> {handleScrUnit(true);}}>μmol/L</Button>
                      </div>
                    </div>
                  </div>
                  <div style={{display:'flex', flexDirection:'column', width:'100%', marginTop:'0.2rem', marginBottom:'4px'}}>
                    <div style={{fontFamily:'NeoM', textAlign:'left', color:'gray'}}>Ethnicity</div>
                    <div style={(formError[4])? {width:'65%', display:'flex', flexDirection:'row', alignItems:'center', borderRadius:'2px', boxShadow:'0 0 0 0.2rem rgb(228, 44, 103)'}: {width:'65%', display:'flex', flexDirection:'row', alignItems:'center', borderRadius:'2px', boxShadow:'0 0 0 0'}}>
                      <Button variant={(ethValue !== undefined && !ethValue)? 'leftchecked': 'left'} style={{fontSize:'0.8rem'}} onClick={()=> {handleEth(false)}}>Non Black</Button>
                      <Button variant={(ethValue !== undefined && ethValue)? 'rightchecked': 'right'} style={{fontSize:'0.8rem'}} onClick={()=> {handleEth(true)}}>Black</Button>
                    </div>
                  </div>
                  <div style={{fontFamily:'NeoB', textAlign:'left', color:'black', marginTop:'0.4rem'}}>{"Calculated eGFR: "+ calculatedEgfr}</div>
                  </>)
                  }
              </div>
              <div className='patient-input'>
                <div style={{display:'flex', flexDirection:'column', fontFamily:'NeoB', textAlign:'left'}}>
                  <div>Dipstick</div>
                  <div>albuminuria</div>
                </div>
                <div className='right-aligned'>
                  <div className={(formError[5])? "outline":"nooutline"}>
                    <Button variant={(dipstickAlbuminuria !== undefined && dipstickAlbuminuria)? 'leftchecked': 'left'} style={{fontSize:'0.8rem'}} onClick={()=> {handleDipAlbuminuria(true)}}>Positive</Button>
                    <Button variant={(dipstickAlbuminuria !== undefined && !dipstickAlbuminuria)? 'rightchecked': 'right'} style={{fontSize:'0.8rem'}} onClick={()=> {handleDipAlbuminuria(false)}}>Negative</Button>
                  </div>
                </div>
              </div>
              <div className='patient-input'>
                <div style={{display:'flex', flexDirection:'column', fontFamily:'NeoB', textAlign:'left'}}>
                  <div>Expected</div>
                  <div>surgical duration</div>
                </div>
                <div className='right-aligned'>
                  <div style={{width:'65%', display:'flex', flexDirection:'column', alignItems:'flex-start'}}>
                    <Form.Control className={(formError[6]) ? 'form-control-error' : ''} placeholder='Enter Surgical duration' value={surgDuration} onFocus={(e) => {handleSurgicalDurationFocus(e)}} onBlur={(e) => {handleSurgicalDurationBlur(e)}} onChange={(e) => {handleSurgicalDuration(e)}} required/>
                    {rangeError[3]&&(<div className='oor-text'>Out of range! ({surgDurationNormalRange[0]}~{surgDurationNormalRange[1]})</div>)}
                  </div>
                  <div className='unitbox'>
                    <Form.Text style={{fontSize:'0.8rem'}}> (hours) </Form.Text>
                  </div>
                </div>
              </div>
              <div className='patient-input'>
                <Form.Label> Emergency operation </Form.Label>
                <div className='right-aligned'>
                  <div className={(formError[7])? "outline":"nooutline"}>
                    <Button variant={(emergency !== undefined && emergency)? 'leftchecked': 'left'} style={{fontSize:'0.8rem'}} onClick={()=> {handleEmergency(true)}}>Emergency</Button>
                    <Button variant={(emergency !== undefined && !emergency)? 'rightchecked': 'right'} style={{fontSize:'0.8rem'}} onClick={()=> {handleEmergency(false)}}>Non-emergency</Button>
                  </div>
                </div>
              </div>
              <div className='patient-input'>
                <Form.Label> Diabetes mellitus </Form.Label>
                <div className='right-aligned'>
                  <div className={(formError[8])? "outline":"nooutline"}>
                    <Button variant={(diabetesMellitus !== undefined && diabetesMellitus)? 'leftchecked': 'left'} style={{fontSize:'0.8rem'}} onClick={()=> {handleDiabetestMellitus(true)}}>DM (+)</Button>
                    <Button variant={(diabetesMellitus !== undefined && !diabetesMellitus)? 'rightchecked': 'right'} style={{fontSize:'0.8rem'}} onClick={()=> {handleDiabetestMellitus(false)}}>DM (-)</Button>
                  </div>
                </div>
              </div>
              <div className='patient-input'>
                <Form.Label> RAAS blockade use </Form.Label>
                <div className='right-aligned'>
                  <div className={(formError[9])? "outline":"nooutline"}>
                    <Button variant={(blockAdeUsage !== undefined && blockAdeUsage)? 'leftchecked': 'left'} style={{fontSize:'0.8rem'}} onClick={()=> {handleBlockAdeUsage(true)}}>User</Button>
                    <Button variant={(blockAdeUsage !== undefined && !blockAdeUsage)? 'rightchecked': 'right'} style={{fontSize:'0.8rem'}} onClick={()=> {handleBlockAdeUsage(false)}}>Non-user</Button>
                  </div>
                </div>
              </div>
              <div className='patient-input-flexcol' id={useAlbumin? "pinput-ver2" : "pinput-egfr-sm"}>
                <div style={{display:'flex', flexDirection:'row', width:'100%', justifyContent:'space-between', alignItems:'flex-start'}}>
                  <Form.Label> Hypoalbuminemia </Form.Label>
                  <div className='right-aligned'>
                    <div className={(formError[10])? "outline":"nooutline"}>
                      <Button variant={(hypoalbuminemia !== undefined && hypoalbuminemia)? 'leftchecked': 'left'} style={{fontSize:'0.8rem'}} onClick={()=> {if(!useAlbumin) handleHypoalbuminemia(true);}} disabled={useAlbumin && (hypoalbuminemia===false)}>Hypoalbuminemia</Button>
                      <Button variant={(hypoalbuminemia !== undefined && !hypoalbuminemia)? 'rightchecked': 'right'} style={{fontSize:'0.8rem'}} onClick={()=> {if(!useAlbumin) handleHypoalbuminemia(false);}} disabled={useAlbumin && hypoalbuminemia}>Normal serum albumin</Button>
                    </div>
                  </div>
                </div>
                <Button variant='nooutline' onClick={() => {handleUseAlbuminClick(!useAlbumin)}}>{useAlbumin? "Click to calculate hypoalbuminemia based on albumin values ▲" : "Click to calculate hypoalbuminemia based on albumin values ▼"}</Button>
                  {useAlbumin && 
                  (<>
                  <div className='right-aligned' style={{width:'100%', alignItems:'center'}}>
                    <div style={{display:'flex', flexDirection:'column', width:'65%', alignItems:'flex-start'}}>
                      <div style={{fontFamily:'NeoM', textAlign:'left', color:'gray'}}>Albumin</div>
                        <Form.Control className={(formError[11]) ? 'form-control-error' : ''} placeholder='Enter Albumin' value={albumin} style={{width:'100%'}} onFocus={(e) => {handleAlbuminFocus(e)}} onBlur={(e)=>{handleAlbuminBlur(e)}} onChange={(e) => {handleAlbumin(e)}}/>
                        {rangeError[4]&&(<div className='oor-text'>Out of range! ({albuminNormalRange[0]}~{albuminNormalRange[1]})</div>)}
                    </div>
                    <div className='unitbox'>
                    <Form.Text style={{fontSize:'0.8rem'}}> (g/dL) </Form.Text>
                    </div>
                  </div>
                  </>)
                  }
              </div>
              <div className='patient-input-flexcol' id={useHemoglobin? "pinput-ver2" : "pinput-egfr-sm"}>
                <div style={{display:'flex', flexDirection:'row', width:'100%', justifyContent:'space-between', alignItems:'flex-start'}}>
                  <Form.Label> Anemia </Form.Label>
                  <div className='right-aligned'>
                    <div className={(formError[12])? "outline":"nooutline"}>
                      <Button variant={(anemia !== undefined && anemia)? 'leftchecked': 'left'} style={{fontSize:'0.8rem'}} onClick={()=> {if(!useHemoglobin) handleAnemia(true);}} disabled={useHemoglobin && (anemia===false)}>Anemia</Button>
                      <Button variant={(anemia !== undefined && !anemia)? 'rightchecked': 'right'} style={{fontSize:'0.8rem'}} onClick={()=> {if(!useHemoglobin) handleAnemia(false);}} disabled={useHemoglobin && anemia}>No anemia</Button>
                    </div>
                  </div>
                </div>
                <Button variant='nooutline' onClick={() => {handleUseHemoglobinClick(!useHemoglobin)}}>{useHemoglobin? "Click to calculate anemia based on hemoglobin ▲" : "Click to calculate anemia based on hemoglobin ▼"}</Button>
                  {useHemoglobin && 
                  (<>
                  <div className='right-aligned' style={{width:'100%', alignItems:'center'}}>
                    <div style={{display:'flex', flexDirection:'column', width:'65%', alignItems:'flex-start'}}>
                      <div style={{fontFamily:'NeoM', textAlign:'left', color:'gray'}}>Hemoglobin</div>
                        <Form.Control className={(formError[13]) ? 'form-control-error' : ''} placeholder='Enter Hemoglobin' value={hemoglobin} style={{width:'100%'}} onFocus={(e) => {handleHemoglobinFocus(e)}} onBlur={(e)=>{handleHemoglobinBlur(e)}} onChange={(e) => {handleHemoglobin(e)}}/>
                        {rangeError[5]&&(<div className='oor-text'>Out of range! ({hemoglobinNormalRange[0]}~{hemoglobinNormalRange[1]})</div>)}
                    </div>
                    <div className='unitbox'>
                    <Form.Text style={{fontSize:'0.8rem'}}> (g/dL) </Form.Text>
                    </div>
                  </div>
                  </>)
                  }
              </div>
              <div className='patient-input-flexcol' id={useSodium? "pinput-ver2" : "pinput-egfr-sm"} style={{borderBottom: '1px solid black'}}>
                <div style={{display:'flex', flexDirection:'row', width:'100%', justifyContent:'space-between', alignItems:'flex-start'}}>
                  <Form.Label> Hyponatremia </Form.Label>
                  <div className='right-aligned'>
                    <div className={(formError[14])? "outline":"nooutline"}>
                      <Button variant={(hyponatremia !== undefined && hyponatremia)? 'leftchecked': 'left'} style={{fontSize:'0.8rem'}} onClick={()=> {if(!useSodium) handleHyponatremia(true);}} disabled={useSodium && (hyponatremia===false)}>Hyponatremia</Button>
                      <Button variant={(hyponatremia !== undefined && !hyponatremia)? 'rightchecked': 'right'} style={{fontSize:'0.8rem'}} onClick={()=> {if(!useSodium) handleHyponatremia(false);}} disabled={useSodium && hyponatremia}>No hyponatremia</Button>
                    </div>
                  </div>
                </div>
                <Button variant='nooutline' onClick={() => {handleUseSodiumClick(!useSodium)}}>{useSodium? "Click to calculate hyponatremia based on sodium ▲" : "Click to calculate hyponatremia based on sodium ▼"}</Button>
                  {useSodium && 
                  (<>
                  <div className='right-aligned' style={{width:'100%', alignItems:'center'}}>
                    <div style={{display:'flex', flexDirection:'column', width:'65%', alignItems:'flex-start'}}>
                      <div style={{fontFamily:'NeoM', textAlign:'left', color:'gray'}}>Sodium</div>
                        <Form.Control className={(formError[15]) ? 'form-control-error' : ''} placeholder='Enter Sodium' value={sodium} style={{width:'100%'}} onFocus={(e) => {handleSodiumFocus(e)}} onBlur={(e)=>{handleSodiumBlur(e)}} onChange={(e) => {handleSodium(e)}}/>
                        {rangeError[6]&&(<div className='oor-text'>Out of range! ({sodiumNormalRange[0]}~{sodiumNormalRange[1]})</div>)}
                    </div>
                    <div className='unitbox'>
                    <Form.Text style={{fontSize:'0.8rem'}}> (mEq/L) </Form.Text>
                    </div>
                  </div>
                  </>)
                  }
              </div>
              <Button variant="primary" onClick={() => {calculateScore(false)}}>Calculate SPARK class, risk of AKI, and 1- or 3-year dialysis/mortality risk</Button>
              {isScoreOn && (
              <>
                <div style={{display:'flex', flexDirection:'column', alignSelf:'flex-start', fontFamily:'NeoB', border:'2px solid black', padding:'0 4px', marginTop:'0.5rem'}}>Result</div>
                <div className='bottom-col' style={{padding:'8px', marginTop:'0.5rem', justifyContent:'flex-start', border:'2px solid black'}}>
                  <div style={{display:'flex', flexDirection:'column', width:'100%', height:'40px', justifyContent:'center', borderBottom:'1px solid black', textAlign:'left', fontFamily:'NeoB', marginTop:'4px'}}>
                    {`SCORE: ${finalScore}`}
                  </div>
                  <div style={{display:'flex', flexDirection:'column', width:'100%', justifyContent:'center', borderBottom:'1px solid black', textAlign:'left', fontFamily:'NeoB', marginTop:'12px'}}>
                    {`SPARK class`}
                    <Table style={{border:'1px solid black'}}>
                      <thead style={{fontFamily:'NeoB', fontSize:'1rem', whiteSpace:'nowrap'}}>
                        <tr>
                          <th style={{border:'1px solid black'}}>SPARK class</th>
                          <th style={{border:'1px solid black'}}>Total score</th>
                          <th style={{border:'1px solid black'}}>AKI</th>
                          <th style={{border:'1px solid black'}}>Critical AKI</th>
                        </tr>
                      </thead>
                      <tbody className='description-text'>
                          {((finalScore!==undefined) && (finalScore<20))?  
                        <tr style={{border:'1px solid black', backgroundColor:'#38AED7'}}>
                          <td style={{border:'1px solid black'}}>A</td>
                          <td style={{border:'1px solid black'}}>＜20</td>
                          <td style={{border:'1px solid black'}}>less likely (＜2%)</td>
                          <td style={{border:'1px solid black'}}>less likely (＜2%)</td>
                        </tr>:
                        ( ((finalScore!==undefined) && (finalScore>=20) && (finalScore<40))?
                        <tr style={{border:'1px solid black', backgroundColor:'#878899'}}>
                          <td style={{border:'1px solid black'}}>B</td>
                          <td style={{border:'1px solid black'}}>≥20 and ＜40</td>
                          <td style={{border:'1px solid black'}}>possible (≥2%)</td>
                          <td style={{border:'1px solid black'}}>less likely (＜2%)</td>
                        </tr>:
                        ( ((finalScore!==undefined) && (finalScore>=40) && (finalScore<60))?
                        <tr style={{border:'1px solid black', backgroundColor:'#DCCE9E'}}>
                          <td style={{border:'1px solid black'}}>C</td>
                          <td style={{border:'1px solid black'}}>≥40 and ＜60</td>
                          <td style={{border:'1px solid black'}}>at risk (≥10%)</td>
                          <td style={{border:'1px solid black'}}>possible (≥2%)</td>
                        </tr>:
                        <tr style={{border:'1px solid black', backgroundColor:'#FF0000'}}>
                          <td style={{border:'1px solid black'}}>D</td>
                          <td style={{border:'1px solid black'}}>≥60</td>
                          <td style={{border:'1px solid black'}}>definite risk (≥20%)</td>
                          <td style={{border:'1px solid black'}}>at risk (≥10%)</td>
                        </tr>))
                        }
                      </tbody>
                    </Table>
                  </div>

                  <div style={{display:'flex', flexDirection:'column', width:'100%', justifyContent:'center', borderBottom:'1px solid black', textAlign:'left', fontFamily:'NeoB', marginTop:'16px', paddingBottom:'8px'}}>
                    <div>
                      {`1-year dialysis/mortality risk: ${oneyearmortalityProbability?.toFixed(2)}%`}
                    </div>
                    <div>
                      {`3-year dialysis/mortality risk: ${threeyearmortalityProbability?.toFixed(2)}%`}
                    </div>
                  </div>
                </div>
              </>
              )
            }
              <div style={{fontFamily: 'NeoB', marginTop: '36px', marginBottom:'12px', fontSize: '1.5rem'}}>
                {`Additional information for more robust-prediction of long-term prognosis`}
              </div>
              <div className='patient-input-flexcol' id={usePostOPScr? "pinput-egfr" : "pinput-egfr-sm"}>
                <div style={{display:'flex', flexDirection:'row', width:'100%', justifyContent:'space-between', alignItems:'flex-start'}}>
                  <Form.Label> AKI stage </Form.Label>
                  <div style={{display:'flex', flexDirection:'column', height:'100%', width:'70%', justifyContent:'space-between'}}>
                    <div className='right-aligned' style={{width:'100%', height:'25%', alignItems:'flex-start'}}>
                      <div className={(formError[16])? "outline":"nooutline"}>
                      <Button variant={(akiStageValue !== undefined && (akiStageValue === 0))? 'leftchecked': 'left'} style={{fontSize:'0.6rem'}} onClick={()=> {handleAKIStage(0)}} disabled={usePostOPScr}>No AKI</Button>
                        <Button variant={(akiStageValue !== undefined && (akiStageValue === 1))? 'centerchecked': 'center'} style={{fontSize:'1rem'}} onClick={()=> {handleAKIStage(1)}} disabled={usePostOPScr}>1</Button>
                        <Button variant={(akiStageValue !== undefined && (akiStageValue === 2))? 'centerchecked': 'center'} style={{fontSize:'1rem'}} onClick={()=> {handleAKIStage(2)}} disabled={usePostOPScr}>2</Button>
                        <Button variant={(akiStageValue !== undefined && (akiStageValue === 3))? 'rightchecked': 'right'} style={{fontSize:'1rem'}} onClick={()=> {handleAKIStage(3)}} disabled={usePostOPScr}>3</Button>
                      </div>
                    </div>
                  </div>
                </div>
                <Button variant='nooutline' style={{width:'100%'}} onClick={() => {handleUsePostOPScrClick(!usePostOPScr)}}>{usePostOPScr? "Click to calculate AKI stage based on post-operative creatinine values ▲" : "Click to calculate AKI stage based on post-operative creatinine values ▼"}</Button>
                {usePostOPScr && 
                (<>
                <div className='right-aligned' style={{width:'100%', height:'30%', alignItems:'flex-start', marginBottom:'4px'}}>
                  <div style={{display:'flex', flexDirection:'column', width:'65%', alignItems:'flex-start'}}>
                    <div style={{fontFamily:'NeoM', textAlign:'left', color:'gray'}}>Post-operative Serum Creatinine</div>
                      <Form.Control className={(formError[17]) ? 'form-control-error' : ''} placeholder='Enter Serum Creatinine' value={postOPScr} style={{width:'100%'}} onFocus={(e) => {handlePostOPScrFocus(e)}} onBlur={(e)=>{handlePostOPScrBlur(e)}} onChange={(e) => {handlePostOPScr(e)}}/>
                      {rangeError[7]&&(<div className='oor-text'>{!postscrUnitValue? "Out of range! (0.01~10)": "Out of range! (50~1000)"}</div>)}
                  </div>
                  <div className='unitbox' style={{marginTop:'1.5rem'}}>
                    <div style={{width:'70%', minWidth:'76px'}}>
                      <Button variant={(postscrUnitValue !== undefined && !postscrUnitValue)? 'leftcheckedsm': 'leftsm'} style={{fontSize:'0.8rem'}} onClick={()=> {handlePostOPScrUnit(false);}} disabled={postscrUnitValue}>mg/dL</Button>
                      <Button variant={(postscrUnitValue !== undefined && postscrUnitValue)? 'rightcheckedsm': 'rightsm'} style={{fontSize:'0.8rem'}} onClick={()=> {handlePostOPScrUnit(true);}}>μmol/L</Button>
                    </div>
                  </div>
                </div>
                <div style={{fontFamily:'NeoB', textAlign:'left', color:'black', marginTop:'0.4rem'}}>{"Calculated AKI stage: "+ calculatedAKIStage}</div>
                </>)
                }
              </div>
              <div className='patient-input' style={{borderBottom: '1px solid black'}}>
                <div style={{display:'flex', flexDirection:'column', fontFamily:'NeoB', textAlign:'left'}}>
                  <div>Underlying</div>
                  <div>malignancy history</div>
                </div>
                <div className='right-aligned'>
                  <div className={(formError[18])? "outline":"nooutline"}>
                    <Button variant={(malhistory !== undefined && malhistory)? 'leftchecked': 'left'} style={{fontSize:'1rem'}} onClick={()=> {handleMalHistory(true)}}>Yes</Button>
                    <Button variant={(malhistory !== undefined && !malhistory)? 'rightchecked': 'right'} style={{fontSize:'1rem'}} onClick={()=> {handleMalHistory(false)}}>No</Button>
                  </div>
                </div>
              </div>
            </div>
            {isAdditionalScoreOn && (
              <>
                <div style={{display:'flex', flexDirection:'column', alignSelf:'flex-start', fontFamily:'NeoB', border:'2px solid black', padding:'0 4px', marginTop:'0.5rem'}}>Result</div>
                <div className='bottom-col' style={{padding:'8px', marginTop:'0.5rem', justifyContent:'flex-start', border:'2px solid black'}}>
                  <div style={{display:'flex', flexDirection:'column', width:'100%', justifyContent:'center', borderBottom:'1px solid black', textAlign:'left', fontFamily:'NeoB', marginTop:'16px', paddingBottom:'8px'}}>
                    <div>
                      {`1-year dialysis/mortality risk with additional information: ${oneyearmortalityProbabilityAdditional?.toFixed(2)}%`}
                    </div>
                    <div>
                      {`3-year dialysis/mortality risk with additional information: ${threeyearmortalityProbabilityAdditional?.toFixed(2)}%`}
                    </div>
                  </div>
                </div>
              </>
              )
            }
            <Button variant="primary" onClick={() => {calculateScore(true)}}>Calculate 1- or 3-year dialysis/mortality risk with the additional information</Button>
          </div>
          <div style={{display:'flex', flexDirection:'column'}}>
            <div className='instruction-text'>
              <p style={{marginTop:'1rem', fontFamily:'NeoB', fontSize:'1.2rem'}}> Variable Descriptions </p>
              <div style={{display:'flex', flexDirection:'column', alignItems:'flex-start', width:'100%'}}>
                <Table>
                  <thead style={{fontFamily:'NeoB', fontSize:'1rem', whiteSpace:'nowrap'}}>
                    <tr style={{textAlign:'left'}}>
                      <th>Variable</th>
                      <th>Description</th>
                    </tr>
                  </thead>
                  <tbody className='description-text'>
                    <tr style={{textAlign:'left'}}>
                      <td>Age</td>
                      <td>years</td>
                    </tr>
                    <tr style={{textAlign:'left'}}>
                      <td>Sex</td>
                      <td>Male or Female</td>
                    </tr>
                    <tr style={{textAlign:'left'}}>
                      <td>eGFR</td>
                      <td>Calculated by CKD-EPI equation based on serum creatinine level</td>
                    </tr>
                    <tr style={{textAlign:'left'}}>
                      <td>Urine dipstick albuminuria</td>
                      <td><div>(-) or (+/-): negative</div><div>(+ or higher): positive</div></td>
                    </tr>
                    <tr style={{textAlign:'left'}}>
                      <td>Expected surgical duration</td>
                      <td>Planned or expected duration before surgery</td>
                    </tr>
                    <tr style={{textAlign:'left'}}>
                      <td>Emergency operation</td>
                      <td>Emergency or non-emergency (pre-scheduled) surgery</td>
                    </tr>
                    <tr style={{textAlign:'left'}}>
                      <td>Diabetes mellitus</td>
                      <td>Based on past medical history</td>
                    </tr>
                    <tr style={{textAlign:'left'}}>
                      <td>RAAS blockade use</td>
                      <td>Ace I or ARB usage</td>
                    </tr>
                    <tr style={{textAlign:'left'}}>
                      <td>Hypoalbuminemia</td>
                      <td><div>{`Hypoalbuminemia (<3.5g/dL) or`}</div><div>{`Normal serum albumin`}</div></td>
                    </tr>
                    <tr style={{textAlign:'left'}}>
                      <td>Anemia</td>
                      <td>{`anemia (< 12 g/dL for female, 13 g/dL for male)`}</td>
                    </tr>
                    <tr style={{textAlign:'left'}}>
                      <td>Hyponatremia</td>
                      <td><div>{`Hyponatremia (< 135 mEq/L)  or`}</div><div>{`No hyponatremia`}</div></td>
                    </tr>
                    <tr style={{textAlign:'left'}}>
                      <td>AKI stage</td>
                      <td><div>{`Defined based on serum Cr level change`}</div><div>{`Stage 1 AKI: ≥ 0.3 mg/dL or ≥ 1.5-fold increase from baseline`}</div><div>{`Stage 2 AKI: ≥ 2-fold increase from baseline`}</div><div>{`Stage 3 AKI: ≥ 3-fold increase from baseline or ≥ 4 mg/dL at postoperative measurement`}</div></td>
                    </tr>
                    <tr style={{textAlign:'left'}}>
                      <td>Underlying malignancy history</td>
                      <td><div>{`Any malignancy that is active at baseline`}</div></td>
                    </tr>
                  </tbody>
                </Table>
              </div>
            </div>
          </div>
        </div> 
        <div className='bottom-row'>
          <div style={{display:'flex', flexDirection:'column', alignItems:'flex-start', width:'100%', marginTop:'1rem'}}>
            <div className='description-text' style={{width:'100%', whiteSpace:'pre-line', alignItems:'flex-start', textAlign:'left'}}>
              <span style={{fontFamily:'NeoB', fontSize:'1rem'}}>SPARK classification:</span>
              <span style={{fontSize:'1rem'}}>{" SPARK classification for postoperative AKI risk prediction based on preoperative factors with extended prediction for long-term prognosis in non-cardiac surgery: SPARK score system has been developed to estimate postoperative AKI risk in non-cardiac operations based on preoperative variables. The SPARK classification provides comprehensible estimated risk category for postoperative AKI. With an extended calculation, the calculator also provides risk estimates for 1-year or 3-year dialysis/mortality risk. Users can insert additional information after surgery (occurrence of AKI and AKI stage, history of malignancy) and the calculator will update the estimates by more robust prediction automatically."}</span>
            </div>
          </div>
        </div>
        <div className='bottom-row'>
          <div style={{display:'flex', flexDirection:'column', alignItems:'flex-start', width:'100%', marginTop:'1rem'}}>
            <div className='description-text' style={{width:'100%', whiteSpace:'pre-line', alignItems:'flex-start', textAlign:'left'}}>
              <span style={{fontFamily:'NeoB', fontSize:'1rem'}}>Disclaimer:</span>
              <span style={{fontSize:'1rem'}}>{" Please note the predicted risks provided to you are only estimates. The risk estimates are to provide easily interpretable calculation of risks based on several clinical variables, thus, there may be other factors affecting patient outcome. This information should not replace the advice of an attending doctor or healthcare provider about the diagnosis, treatment, or potential outcomes. The provider is not responsible for medical decisions that may be made based on the risk calculator estimates, since these estimates are provided for informational purposes. Patients should always consult their doctor or other health care provider before deciding on a treatment plan."}</span>
            </div>
          </div>
        </div>
        <div className='bottom-row'>
          <div style={{display:'flex', flexDirection:'column', alignItems:'flex-start', width:'100%', marginTop:'1rem'}}>
            <div className='description-text' style={{width:'100%', whiteSpace:'pre-line', alignItems:'flex-start', textAlign:'left'}}>
              <span style={{fontFamily:'NeoB', fontSize:'1rem'}}>Permission of usage:</span>
              <span style={{fontSize:'1rem'}}>{" This calculator has been developed from the Division of Nephrology, Department of Internal Medicine, Seoul National University Hospital. An external platform (e.g., an electronic health record) may open the online-access of this calculator in a new browser window. However, we do not permit the calculator to appear as an integrated feature of any external platform, nor do we permit the functionality of the calculator to be automated in any way. The calculator must be presented in its original, unaltered form, maintaining all SNUH branding and copyright information."}</span>
            </div>
          </div>
        </div>
        <div className='bottom-row'>
          <div style={{display:'flex', flexDirection:'column', alignItems:'flex-start', width:'100%', marginTop:'1rem'}}>
            <div className='description-text' style={{width:'100%', whiteSpace:'pre-line', alignItems:'flex-start', textAlign:'left'}}>
              <span style={{fontFamily:'NeoB', fontSize:'1rem'}}>Related reference:</span>
              <span style={{fontSize:'1rem'}}>{"\n 1) Park S, Cho H, Park S, Lee S, Kim K, Yoon HJ, Park J, Choi Y, Lee S, Kim JH, Kim S, Chin HJ, Kim DK, Joo KW, Kim YS, Lee H. Simple Postoperative AKI Risk (SPARK) Classification before Noncardiac Surgery: A Prediction Index Development Study with External Validation. J Am Soc Nephrol. 2019 Jan;30(1):170-181. doi: 10.1681/ASN.2018070757."}</span>
            </div>
          </div>
        </div>
        <div className='bottom-row'>
          <div style={{display:'flex', flexDirection:'column', alignItems:'flex-start', width:'100%', marginTop:'1rem', border:'1px solid black', padding:'8px', marginBottom:'1rem'}}>
            <p style={{fontFamily:'NeoB', fontSize:'1rem'}}>Acute kidney injury risk calculation models</p>
            <a href="https://snuhnephrology.github.io/" style={{fontSize:'0.8rem'}}>Post-nephrectomy kidney outcome prediction for live kidney donors</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;