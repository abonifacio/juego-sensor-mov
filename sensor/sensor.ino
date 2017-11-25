/*
Sensor de proximidad y al ser inferior a 10cm
envia un pulso de alarma por  el pin 13

 HC-SR04 conexiones:
  VCC al arduino 5v
  GND al arduino GND
  Echo al Arduino pin 6
  Trig al Arduino pin 7

Descargar planos de conexiones en http://elprofegarcia.com/
 */

 #define Pecho 6
 #define Ptrig 7
 #define CANT_MUESTRAS 7
 #define MEDIO 3
 #define DELAY 8

 long duracion,espera;
 long distancia,suma;
 int efectivas,vueltas;


 long historicas[CANT_MUESTRAS];

 void bubble_sort(long list[], long n);

 void setup() {
   Serial.begin (9600);       // inicializa el puerto seria a 9600 baudios
   pinMode(Pecho, INPUT);     // define el pin 6 como entrada (echo)
   pinMode(Ptrig, OUTPUT);    // define el pin 7 como salida  (triger)
   pinMode(13, 1);            // Define el pin 13 como salida
   suma = 0;
   efectivas = 0;
   vueltas = 0;
   for(int i;i<CANT_MUESTRAS;i++){
        historicas[i]=0;
    }
}

 void loop() {

   digitalWrite(Ptrig, LOW);
   delayMicroseconds(2);
   digitalWrite(Ptrig, HIGH);   // genera el pulso de triger por 10ms
   delayMicroseconds(10);
   digitalWrite(Ptrig, LOW);

   duracion = pulseIn(Pecho, HIGH);             // calcula la distancia en mm

   if(duracion<2321){
     distancia = (duracion/2) / 29  ;
     espera = DELAY - duracion / 1000;
     suma+=distancia;
     efectivas++;
     historicas[vueltas]=distancia;
   }else{
      espera = 1;
   }
   vueltas++;
   if(vueltas==CANT_MUESTRAS){
     bubble_sort(historicas,CANT_MUESTRAS);
     Serial.println(historicas[MEDIO]);
     for(int i;i<CANT_MUESTRAS;i++){
       historicas[i]=0;
     }
     suma = 0;
     efectivas = 0;
     vueltas = 0;
   }

   digitalWrite(13, 0);
   delay(espera);
 }

 void bubble_sort(long list[], long n)
{
    long c, d, t;

    for (c = 0 ; c < ( n - 1 ); c++)
    {
        for (d = 0 ; d < n - c - 1; d++)
        {
        if (list[d] > list[d+1])
        {
            t         = list[d];
            list[d]   = list[d+1];
            list[d+1] = t;
        }
        }
    }
}
