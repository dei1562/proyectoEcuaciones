import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  poblacionObjetivo:number;

  pInicial:number;
  tInicial:number;
  cInicial:number;

  pYearOne:number;

  k:number;
  c:number;
  p:number;
  t:number;

  totales: Array<any>;
  displayedColumns: string[] = ['year', 'poblacion'];

  resultado:number;
  tResultado:number;

  public lineChartData:Array<any>;

  public lineChartLabels:Array<any>;

  public lineChartOptions:any = {
    responsive: true
  };
  
  public lineChartColors:Array<any> = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];

  public lineChartLegend:boolean = true;
  public lineChartType:string = 'line';

  showChart:boolean = false;

  constructor() {
    this.pInicial = 0;
    this.tInicial = 0;
    this.cInicial = null;
  }

  ngOnInit() {
  }

  calcularK(pInicial, tInicial) {

    pInicial = (pInicial) ? pInicial : 0;
    tInicial = (tInicial) ? tInicial : 0;

    let p =  pInicial / this.poblacionObjetivo;

    let resultado = - ((p - 1) / Math.exp(-this.cInicial*tInicial));
    this.k = resultado;
  }

  calcularC(t) {

    let p = this.pYearOne / this.poblacionObjetivo;

    let resultado = - ((Math.log( - ((p - 1) / this.k)) / t));
    this.c = resultado;
  }

  calcularT() {
    let p = this.p / this.poblacionObjetivo;

    this.calcularK(0,0);
    this.calcularC(1);

    let resultado = - ((Math.log( - ((p - 1) / this.k)) / this.c));
    // this.t = resultado;

    this.tResultado = this.decimalAdjust('round', resultado, -1);
  }

  calcularP(t, flagResultado) {

    this.calcularK(0,0);
    this.calcularC(1);

    let resultado = 1 - ( Math.exp( - ( this.c * t )) * this.k );
    
    resultado = resultado * this.poblacionObjetivo;
    resultado = Math.round(resultado);

    if(flagResultado == true) {
      this.resultado = resultado;
    }

    return resultado;
  }

  calcularPoblacion (){

    this.tResultado = null;
    this.showChart = false;
    this.totales = [];
    this.calcularP(this.t, true);

    let arrPoblacion = [0, this.pYearOne];
    let arrYears = [0, 1];

    this.totales.push({'year': 0, 'poblacion': 0});
    this.totales.push({'year': 1, 'poblacion': this.pYearOne});

    for (let index = 2; index <= this.t; index++) {
      let poblacion = this.calcularP(index, false);
      
      this.totales.push({'year': index, 'poblacion': poblacion});
      arrPoblacion.push(poblacion);
      arrYears.push(index);
    }

    this.lineChartData = [
      {data: arrPoblacion, label: 'Población'},
    ];    
  
    this.lineChartLabels = arrYears;
    
    setTimeout(() => {
      this.showChart = true;
    }, 500);
  }

  /**
   * Ajuste decimal de un número.
   *
   * @param {String}  tipo  El tipo de ajuste.
   * @param {Number}  valor El numero.
   * @param {Integer} exp   El exponente (el logaritmo 10 del ajuste base).
   * @returns {Number} El valor ajustado.
   */
  decimalAdjust(type, value, exp) {
    // Si el exp no está definido o es cero...
    if (typeof exp === 'undefined' || +exp === 0) {
      return Math[type](value);
    }
    value = +value;
    exp = +exp;
    // Si el valor no es un número o el exp no es un entero...
    if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
      return NaN;
    }
    // Shift
    value = value.toString().split('e');
    value = Math[type](+(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp)));
    // Shift back
    value = value.toString().split('e');
    return +(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp));
  }

}
