
declare global {
    namespace jasmine {
        interface Matchers<T> {
            hasArraySameElements(expected: any, expectationFailOutput?: any): boolean;
        }
    }
  }

export let  customMatchers = {
    hasArraySameElements: function(){
      return {
        compare: function(inputArray: any[], expectedResultArray: any[]){
          // console.log(`%cInput of test is ${JSON.stringify(inputArray)}`, 'background-color: red; color: white;')
          // console.log(`%cExpected result is ${JSON.stringify(expectedResultArray)}`, 'background-color: red; color: white;')
          let result = {pass:false, message: ''}
          let arrInputLenght = inputArray.length;
          let arrExpectedLenght = expectedResultArray.length;
          let flatCompareArrays = function(arr1: any[], arr2: any[]):boolean {
            let len1 = arr1.length;
            let len2 = arr2.length;
            if (len1 != len2) {
              console.log(`Elements lenght unequal`)
              return false;
            }
            for (let i = 0; i < len1; i++){
              if (arr1[i] != arr2[i]) return false
            }
            return true;
          }
          let getIndexOfElementInArray = function(searchedArr: any[], element: any) {
            let index = -1;
            searchedArr.forEach((el:any, i:number) => {
              if (flatCompareArrays(el, element)) index = i;
            });
            return index;
          }
          if (arrInputLenght != expectedResultArray.length) return {pass: false, message: 'Arrays unequal'}
          for (let inputElement of inputArray) {
            let foundIndex = getIndexOfElementInArray(expectedResultArray, (inputElement));
            if (foundIndex == -1) return {pass: false, message: `Element ${inputElement} not found`}
            expectedResultArray.splice(foundIndex, 1);
          }
          return {pass: true, message: 'Arrays are equal'}
        }
      }
    }
  }