import { Component } from '@angular/core';
import { colorService } from './color-service';
import defaultColor from '../defaultColor.json';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  colorArr = [];
  constructor(private colorService: colorService) {
    /** if you want to get data from api uncomment below line */
    // this.getColorsFromApi();
    /** if want to show all color by default uncomment below line */
    // this.colorArr = this.colorService.getColorArray();
  }
  /** convert word into an color */
  convertColor(event) {
    this.colorArr = [];
    if (event.target.value && event.target.value.length > 1) {
      this.getColorFromJson(event.target.value);
    } else {
      this.colorArr = [];
    }
  }
  /** if color not found then get color from json */
  getColorFromJson(val) {
    var found: boolean = false;
    for (var prop in defaultColor) {
      if (defaultColor.hasOwnProperty(prop)) {
        if (prop === val) {
          found = true;
          var objColor = defaultColor[prop].split(',');
          for (let i = 0; i < objColor.length; i++) {
            if (objColor[i]) {
              this.createColorObj(objColor[i]);
            }
          }
        }
      }
    }
    if (found === false) {
      this.createColorObj(val);
    }
  }
  /** create color object to show on front end */
  createColorObj(val) {
    if (val) {
      var c = this.colorService.colorConverter(val);
      var hexVal = this.colorService.toHexString(c);
      if (hexVal) {
        this.colorArr.push(hexVal.replace('#', ''));
      }
    }
  }
  /**get colors json from api call */
  getColorsFromApi() {
    this.colorService.getColorsFromAPI().subscribe((color: any) => {
      this.colorArr = [];
      // let colorObj = [
      //   { name: 'red', color: '#ff0000' },
      //   { name: 'blue', color: '#0000ff' },
      // ];
      /** update condition as per parameter name */
      if (color && color.data && color.data.color) {
        color.map((color) => {
          this.createColorObj(color.name);
        });
      }
    });
  }
}
