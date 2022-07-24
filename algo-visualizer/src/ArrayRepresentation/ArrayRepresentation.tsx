import React, { useState } from 'react';
import './ArrayRepresentation.css';
import Button from "react-bootstrap/Button";
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { Form } from 'react-bootstrap';

const ArrayRepresentation = () => {
  const [arr, setArr] = useState([
    {status: 'primary', value: 0}
  ]);

  const [res, setRes] = useState([{status: 'primary', value: 0}]);
  const [val, setVal] = useState('N/A');
  const [textInput, setTextInput] = useState('');

  const handleInputTextChange = (event: any) => {
    setTextInput(event.target.value)
    console.log(textInput)
  }

  const generateRandomArray = (): {status: string, value: number}[] => {
    const MAX_ELE_VALUE = 100;
    const MAX_ARR_LENGTH = 50;
    const arrLength = Math.floor(Math.random() * MAX_ARR_LENGTH);
    const result: {status: string, value: number}[] = [];

    for (let index = 0; index < arrLength; index++) {
      result.push({status: 'primary', value: Math.floor(Math.random() * MAX_ELE_VALUE)});
    }

    return result;
  }

  const arrReset = (currArr: any[]) => {
    currArr.forEach(e => {
      e.status = 'primary'
    });
    return currArr;
  }

  const runningSum = (nums: {status: string, value: number}[]) => {
    let currSum = 0
    let runningSum: {status: string, value: number}[] = []
    let prevStateCopy = [...arr];
    setArr(arrReset(arr));
    nums.forEach(function callback(value, index) {
      setTimeout(() => {
        currSum += value.value;
        runningSum.push({status: 'primary', value: currSum});
        let stateArrCopy = [...prevStateCopy];
        let stateArrItemCopy = {...stateArrCopy[index]};
        stateArrItemCopy.status = 'danger';
        stateArrCopy[index] = stateArrItemCopy;
        setArr(stateArrCopy);
        setRes(runningSum);
        prevStateCopy = [...stateArrCopy];
      }, 200 * index) // multiplying ms with index will make loop iterations execute in order
    })
  }

  const findPivotUIUpdate = (nums: {status: string, value: number}[], index: number, valText: string) => {
    console.log('trying to update ui', nums, index, valText)
    const stateCopy = [...nums]
    const stateEleCopy = {...stateCopy[index]}
    stateEleCopy.status = 'danger'
    stateCopy[index] = stateEleCopy;
    setArr(stateCopy);
    setVal(valText)
  }

  const findPivot = (nums: {status: string, value: number}[]) => {
    const tmp = [1,7,3,6,5,6];
    nums = []
    tmp.forEach(e => {
      nums.push({status: 'primary', value: e})
    });
    let leftSum = 0
    let totalSum = 0
    nums.forEach(e => {
      totalSum += e.value
    });
    for (let index = 0; index < nums.length; index++) {
      let rightSum = totalSum - leftSum - nums[index].value;
      let valText = `Total: ${totalSum} Left Sum: ${leftSum} Right Sum: ${rightSum}`
      if (leftSum === rightSum) {
        // eslint-disable-next-line no-loop-func
        valText = `Total: ${totalSum} Left Sum: ${leftSum} Right Sum: ${rightSum} Pivot Index: ${index}`
        setTimeout(findPivotUIUpdate, 200 * index, nums, index, valText)
        return
      }
      leftSum += nums[index].value
      // eslint-disable-next-line no-loop-func
      setTimeout(findPivotUIUpdate, 200 * index, nums, index, valText)
    }
  }

  return (
    <div>
      <Form>
        <Form.Control type='text' placeholder='Enter a comma separated list of numbers' value={textInput} onChange={handleInputTextChange}/>
      </Form>
      <Button onClick={() => {setArr(generateRandomArray()); setRes([]);}}>Generate Random Array</Button>
      <Button onClick={() => runningSum(arr)}>Calculate CurrSum</Button>
      <Button onClick={() => findPivot(arr)}>Find Pivot Index</Button>
      <ButtonGroup>
        {arr.map(e => <Button variant={e.status}>{e.value}</Button>)}
      </ButtonGroup>
      <div>
        <p>Result:</p>
        <ButtonGroup>
          {res.map(e => <Button variant={e.status}>{e.value}</Button>)}
        </ButtonGroup>
      </div>
      <div>
        <p>Result:</p>
        <h2>{val}</h2>
      </div>
    </div>
  );
}

export default ArrayRepresentation;
