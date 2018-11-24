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

    let resultado = - ((Math.log( - ((p - 1) / this.k)) / this.c));
    this.t = resultado;
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

    this.totales = [];
    this.calcularP(this.t, true);

    this.totales.push({'year': 0, 'poblacion': 0});
    this.totales.push({'year': 1, 'poblacion': this.pYearOne});

    for (let index = 2; index <= this.t; index++) {
      let poblacion = this.calcularP(index, false);
      
      this.totales.push({'year': index, 'poblacion': poblacion});
    }

    console.log("this.totales", this.totales);
  }

}
