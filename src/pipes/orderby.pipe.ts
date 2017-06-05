import { Pipe,PipeTransform } from "@angular/core";

@Pipe({
    name: "orderby"
})

export class OrderByPipe implements PipeTransform {

    transform(array: Array<any>, args?) {

        if (array) {

            // get the first element

            console.log('array', array);
            console.log('args', args);

            let orderByValue = args;
            let byVal = 1;

            // check if exclamation point

            if (orderByValue.charAt(0) == "!") {

                // reverse the array

                byVal = -1;
                orderByValue = orderByValue.substring(1)
            }

            array.sort((a: any, b: any) => {
                if (a[orderByValue] < b[orderByValue]) {
                    return -1 * byVal;
                } else if (a[orderByValue] > b[orderByValue]) {
                    return 1 * byVal;
                } else {
                    return 0;
                }
            });

            console.log('sorted', array);

            return array;
        }
    }
}
