<template>
 <div class="databank">
     <strong class="mx-6" style="color:blue"> DB-Optionen: </strong>
      <strong class="mx-20"  style="color:blue">Vorlage Laden:</strong>
      <div class="br">&nbsp;</div>
         <v-btn class="li" @click="myfunc()"><a href="#home"><center>Hinzu.</center></a></v-btn>
         <!--v-btn class = "li" id="r" @click="re(true)"><a href="#Graphen-entfernen"><center> Remove </center></a></!--v-btn>-->
         <v-btn class="li" @click="go()"><a href="#Musterlösungen"><center>Muster</center></a></v-btn>
         <v-btn class="li" @click="zurueck()"><a href="#zurueck"><center> Zurueck </center></a></v-btn>
         <div class="vr"></div>
        <div align="left" id="First">
        <img id="0" class="rectangle" src="@/assets/img/g.png" @click="selected(0)"/>
        </div>
 </div>
</template>
<script>
        var r = false;
        var i = 1;
        var b = 130;
        var t = 220;
        var z = 180;
  export default {
   name: 'datenbank',
   methods:{
       selected(index){
         alert("Graph " + index+ " selected!");
     },
         myfunc(){
           if ( b < 1100 && t <= 748 && r == false) {
            b = b+z;
            document.getElementById("First").innerHTML+= '<img id="'+i+'"class="rectangle" style ="left:'+b+'px;top:'+t+'px" src="@/assets/img/g.png" @click="selected('+i+')" />';
            i++;
          }
          else if (b >= 1100 && t <= 748 && r == false){
            b = 130;
            t = t+132;
            document.getElementById("First").innerHTML+= '<img id="'+i+'" class="rectangle" style="left:'+ b +'px;top:'+ t +'px" src="@/assets/img/g.png" @click="selected('+i+')" /> ';
            i++;
          }
          else if ((t == 748 || t > 748) && b == 130 && r == false){
          alert("Datnbank ist voll!");
          }
        else if (r == true) {
          alert("Error Musterlösungen");
        }
      },
    go(){
      if (r == false){
        document.getElementById("First").innerHTML = '<img id="1" class="rectangle" src="@/assets/img/g.png" style="left:130px" @click="selected(1)" />'+'<img id="2" class="rectangle" style="left:260px" src="@/assets/img/g.png" @click="selected(2)" />'+'<img id="3" class="rectangle"  style="left:390px" src="@/assets/img/g.png" @click="selected(3)" />'+'<img id="4" class="rectangle" style="left:550px" src="@/assets/img/g.png" @click="selected(4)" />';
        r = true;
      }
        else  {
          alert('Musterlösungen sind bereits geladen!');
        }
    },
    zurueck(){
     if (r == false)
      window.location.href='/graph';
      else
      window.location.href='/database';
    }
     }
  }
</script>
