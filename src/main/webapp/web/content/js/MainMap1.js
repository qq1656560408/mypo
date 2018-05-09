/**
 * 8c地图服务
 */
//var localhost="http://127.0.0.1:8090";
var url = localhost + "/iserver/services/map-MeiZhouShi/rest/maps/meizhou"; // 地图服务
var urlData = localhost + "/iserver/services/data-MeiZhouShi/rest/data";  // 数据服务
var urlUpdateDataset = localhost + "/iserver/services/data-MeiZhouShi/rest/data/datasources/meizhoumap/datasets/区县界_region"; //修改数据集
//地图变量
var layerCount;//图层数量
var clearSpeId = 0; //用于判断专题图类型清空对应专题图
var useDataChartType = 0; //各区县价值量总查询数据调用位置
var useDataAllType = 0; //各区县明细信息查询数据调用位置

//============================价值量数据查询Start==============================
var dataList = [];//保存接口查询数据
//查询数据---水资源各区县总价值量数据接口
function selectDataByWaterIn(yearID,waterTypeID){
  $.ajax({
    url:pathbase+'/waterTypeandFeaturesTable/findWaterValueDataAllByCondition.do',
    type:'POST', //GET
    async:true, //true或false,是否异步,异步：true
    data:{ yearID: yearID, waterTypeID: waterTypeID }, //传递参数 
    timeout:5000,    //超时时间
    dataType:'json',    //返回的数据格式：json/xml/html/script/jsonp/text
    success:function(data,textStatus,jqXHR){
      isfindDataByCondition = true;
      handleThematicDataBySelect(data);//统一处理数据
    },
    error:function(xhr,textStatus){
      isfindDataByCondition = true;
      console.log('selectDataByWaterIn()错误');
    }
  });
}

//查询数据---土地资源各区县总价值量数据接口
function selectDataByLandIn(yearID,waterTypeID){
  $.ajax({
    url:pathbase+'/waterTypeandFeaturesTable/findLandValueDataAllByCondition.do',
    type:'POST', //GET
    async:true, //true或false,是否异步,异步：true
    data:{ yearID: yearID, waterTypeID: waterTypeID }, //传递参数 
    timeout:5000,    //超时时间
    dataType:'json',    //返回的数据格式：json/xml/html/script/jsonp/text
    success:function(data,textStatus,jqXHR){
      isfindDataByCondition = true;
      handleThematicDataBySelect(data);//统一处理数据
    },
    error:function(xhr,textStatus){
      isfindDataByCondition = true;
      console.log('selectDataByLandIn()错误');
    }
  });
}

//查询数据---林木资源各区县总价值量数据接口
function selectDataByForestIn(yearID,waterTypeID){
  $.ajax({
    url:pathbase+'/waterTypeandFeaturesTable/findForestValueDataAllByCondition.do',
    type:'POST', //GET
    async:true, //true或false,是否异步,异步：true
    data:{ yearID: yearID, waterTypeID: waterTypeID }, //传递参数 
    timeout:5000,    //超时时间
    dataType:'json',    //返回的数据格式：json/xml/html/script/jsonp/text
    success:function(data,textStatus,jqXHR){
      isfindDataByCondition = true;
      handleThematicDataBySelect(data);//统一处理数据
    },
    error:function(xhr,textStatus){
      isfindDataByCondition = true;
      console.log('selectDataByForestIn()错误');
    }
  });
}

//查询数据---矿产资源各区县总价值量数据接口
function selectDataByMineralIn(yearID,waterTypeID){
  $.ajax({
    url:pathbase+'/waterTypeandFeaturesTable/findMineValueDataAllByCondition.do',
    type:'POST', //GET
    async:true, //true或false,是否异步,异步：true
    data:{ yearID: yearID, waterTypeID: waterTypeID }, //传递参数 
    timeout:5000,    //超时时间
    dataType:'json',    //返回的数据格式：json/xml/html/script/jsonp/text
    success:function(data,textStatus,jqXHR){
      isfindDataByCondition = true;
      handleThematicDataBySelect(data);//统一处理数据
    },
    error:function(xhr,textStatus){
      isfindDataByCondition = true;
      console.log('selectDataByMineralIn()错误');
    }
  });
}

//查询数据---可再生能源各区县总价值量数据接口
function selectDataByRenewableIn(yearID,waterTypeID){
  $.ajax({
    url:pathbase+'/waterTypeandFeaturesTable/findRenewableValueDataAllByCondition.do',
    type:'POST', //GET
    async:true, //true或false,是否异步,异步：true
    data:{ yearID: yearID, waterTypeID: waterTypeID }, //传递参数 
    timeout:5000,    //超时时间
    dataType:'json',    //返回的数据格式：json/xml/html/script/jsonp/text
    success:function(data,textStatus,jqXHR){
      isfindDataByCondition = true;
      handleThematicDataBySelect(data);//统一处理数据
    },
    error:function(xhr,textStatus){
      isfindDataByCondition = true;
      console.log('selectDataByRenewableIn()错误');
    }
  });
}

//查询数据---大气资源各区县总价值量数据接口
function selectDataByAirIn(yearID,waterTypeID){
  $.ajax({
    url:pathbase+'/waterTypeandFeaturesTable/findAtmosphereValueDataAllByCondition.do',
    type:'POST', //GET
    async:true, //true或false,是否异步,异步：true
    data:{ yearID: yearID, waterTypeID: waterTypeID }, //传递参数 
    timeout:5000,    //超时时间
    dataType:'json',    //返回的数据格式：json/xml/html/script/jsonp/text
    success:function(data,textStatus,jqXHR){
      isfindDataByCondition = true;
      handleThematicDataBySelect(data);//统一处理数据
    },
    error:function(xhr,textStatus){
      isfindDataByCondition = true;
      console.log('selectDataByAirIn()错误');
    }
  });
}

//查询数据---统一处理数据
function handleThematicDataBySelect(data){ 
  var allcount = 0;
  dataList = [];//初始化
  if(data.length > 0){
    for(var i = 0; i < data.length;i++){
      allcount += data[i].inventory1;
      allcount += data[i].inventory2;
      allcount += data[i].inventory3;
      allcount += data[i].inventory4;
      allcount += data[i].inventory5;
      allcount += data[i].inventory6;
      allcount += data[i].inventory7;
      allcount += data[i].inventory8;
      if(allcount != 0){
        dataList.push(Number(data[i].inventory1)); //8个区县统计价值量
        dataList.push(Number(data[i].inventory2));
        dataList.push(Number(data[i].inventory3));
        dataList.push(Number(data[i].inventory4));
        dataList.push(Number(data[i].inventory5));
        dataList.push(Number(data[i].inventory6));
        dataList.push(Number(data[i].inventory7));
        dataList.push(Number(data[i].inventory8));
        dataList.push(allcount); //保存总数
        dataList.push(data[i].inventoryUnit); //最后单位
        //数据获取完毕，执行其他方法
        if(useDataChartType == 1){ //统计图
          //var type = $("#select-statistics option:selected").val();
          var type = getRadioCkType("ra-chart-type");
          createChartByType(type); //数据查询完毕，执行统计图的方法
        }else if(useDataChartType == 2){ //专题图
          var speid = $("#an-select-spe option:selected").val();
          createSelectTypeSpeLayer(speid);//再执行生成专题图的方法
        }
      }else {
        closeAnalyzeResSpecial();
        tipMapStaticsNoDataAutoHide("该条件没有数据，无法生成专题图");
      }
    }
  }else{
    closeAnalyzeResSpecial();
    tipMapStaticsNoDataAutoHide("该条件没有数据，无法生成专题图");
  }
}

//=============================价值量数据查询End==============================

//=============================获取有数据的年份Start==============================
//价值量总统计--获取有数据的年份
function findTypeValueYearByCondition(){ 
  $.ajax({
    url:pathbase+'/waterTypeandFeaturesTable/findTypeValueYearByCondition.do',
    type:'POST', //GET
    async:true, //true或false,是否异步,异步：true
    data:{ }, //传递参数 
    timeout:5000,    //超时时间
    dataType:'json',    //返回的数据格式：json/xml/html/script/jsonp/text
    success:function(data,textStatus,jqXHR){
      isfindDataByCondition = true; //禁止无效查询
      var str = "";
      if(data.length > 0){
        for(var i = 0; i < data.length;i++){
          str += "<option value="+ data[i].yearID +">" + data[i].yearMC + "</option>";
        }
        $("#accWinReport-vl-sel").html(str);
        $("#select-year").html(str);
        $("#an-select-year").html(str);
      }
    },
    error:function(xhr,textStatus){
      isfindDataByCondition = true; //禁止无效查询
      console.log('findTypeValueYearByCondition()错误');
    }
  });
}
//水资源--获取有数据的年份
function findWaterYearByCondition(type){ 
  $.ajax({
    url:pathbase+'/waterTypeandFeaturesTable/findWaterYearByCondition.do',
    type:'POST', //GET
    async:true, //true或false,是否异步,异步：true
    data:{ }, //传递参数 
    timeout:5000,    //超时时间
    dataType:'json',    //返回的数据格式：json/xml/html/script/jsonp/text
    success:function(data,textStatus,jqXHR){
      isfindDataByCondition = true;
      var str = "";
      if(data.length > 0){
        for(var i = 0; i < data.length;i++){
          str += "<option value="+ data[i].yearID +">" + data[i].yearMC + "</option>";
        }
        $("#acc-mx-tb-sel").html(str);
        $("#accCtYearOneSelect1").html(str);
        $("#accCtYearTwoSelect1").html(str);
      }
    },
    error:function(xhr,textStatus){
      console.log('findWaterYearByCondition()错误');
    }
  });
}
//土地资源--获取有数据的年份
function findLandYearByCondition(){ 
  $.ajax({
    url:pathbase+'/waterTypeandFeaturesTable/findLandYearByCondition.do',
    type:'POST', //GET
    async:true, //true或false,是否异步,异步：true
    data:{ }, //传递参数 
    timeout:5000,    //超时时间
    dataType:'json',    //返回的数据格式：json/xml/html/script/jsonp/text
    success:function(data,textStatus,jqXHR){
      isfindDataByCondition = true;
      var str = "";
      if(data.length > 0){
        for(var i = 0; i < data.length;i++){
          str += "<option value="+ data[i].yearID +">" + data[i].yearMC + "</option>";
        }
        $("#acc-mx-tb-sel-land").html(str);
        $("#accCtYearOneSelect2").html(str);
        $("#accCtYearTwoSelect2").html(str);
      }
    },
    error:function(xhr,textStatus){
      console.log('findLandYearByCondition()错误');
    }
  });
}
//林木资源--获取有数据的年份
function findForestYearByCondition(){ 
  $.ajax({
    url:pathbase+'/waterTypeandFeaturesTable/findForestYearByCondition.do',
    type:'POST', //GET
    async:true, //true或false,是否异步,异步：true
    data:{ }, //传递参数 
    timeout:5000,    //超时时间
    dataType:'json',    //返回的数据格式：json/xml/html/script/jsonp/text
    success:function(data,textStatus,jqXHR){
      isfindDataByCondition = true;
      var str = "";
      if(data.length > 0){
        for(var i = 0; i < data.length;i++){
          str += "<option value="+ data[i].yearID +">" + data[i].yearMC + "</option>";
        }
        $("#acc-mx-tb-sel-forest").html(str);
        $("#accCtYearOneSelect3").html(str);
        $("#accCtYearTwoSelect3").html(str);
      }
    },
    error:function(xhr,textStatus){
      console.log('findForestYearByCondition()错误');
    }
  });
}
//矿产资源--获取有数据的年份
function findMineYearByCondition(){ 
  $.ajax({
    url:pathbase+'/waterTypeandFeaturesTable/findMineYearByCondition.do',
    type:'POST', //GET
    async:true, //true或false,是否异步,异步：true
    data:{ }, //传递参数 
    timeout:5000,    //超时时间
    dataType:'json',    //返回的数据格式：json/xml/html/script/jsonp/text
    success:function(data,textStatus,jqXHR){
      isfindDataByCondition = true;
      var str = "";
      if(data.length > 0){
        for(var i = 0; i < data.length;i++){
          str += "<option value="+ data[i].yearID +">" + data[i].yearMC + "</option>";
        }
        $("#acc-mx-tb-sel-mine").html(str);
        $("#accCtYearOneSelect4").html(str);
        $("#accCtYearTwoSelect4").html(str);
      }
    },
    error:function(xhr,textStatus){
      console.log('findMineYearByCondition()错误');
    }
  });
}
//可再生能源--获取有数据的年份
function findRenewableYearByCondition(){ 
  $.ajax({
    url:pathbase+'/waterTypeandFeaturesTable/findRenewableYearByCondition.do',
    type:'POST', //GET
    async:true, //true或false,是否异步,异步：true
    data:{ }, //传递参数 
    timeout:5000,    //超时时间
    dataType:'json',    //返回的数据格式：json/xml/html/script/jsonp/text
    success:function(data,textStatus,jqXHR){
      isfindDataByCondition = true;
      var str = "";
      if(data.length > 0){
        for(var i = 0; i < data.length;i++){
          str += "<option value="+ data[i].yearID +">" + data[i].yearMC + "</option>";
        }
        $("#acc-mx-tb-sel-renewable").html(str);
        $("#accCtYearOneSelect5").html(str);
        $("#accCtYearTwoSelect5").html(str);
      }
    },
    error:function(xhr,textStatus){
      console.log('findRenewableYearByCondition()错误');
    }
  });
}
//大气资源--获取有数据的年份
function findAtmosphereYearByCondition(){ 
  $.ajax({
    url:pathbase+'/waterTypeandFeaturesTable/findAtmosphereYearByCondition.do',
    type:'POST', //GET
    async:true, //true或false,是否异步,异步：true
    data:{ }, //传递参数 
    timeout:5000,    //超时时间
    dataType:'json',    //返回的数据格式：json/xml/html/script/jsonp/text
    success:function(data,textStatus,jqXHR){
      var str = "";
      if(data.length > 0){
        for(var i = 0; i < data.length;i++){
          str += "<option value="+ data[i].yearID +">" + data[i].yearMC + "</option>";
        }
        $("#acc-mx-tb-sel-atmosphere").html(str);
        $("#accCtYearOneSelect6").html(str);
        $("#accCtYearTwoSelect6").html(str);
      }
    },
    error:function(xhr,textStatus){
      console.log('findAtmosphereYearByCondition()错误');
    }
  });
}
//=============================获取有数据的年份End==============================

//========================核算统计表弹窗查询Start========================
var publicData;//明细数据
var isfindDataByCondition = true; //禁止无效查询
//水资源实物量总查询
function findWaterDataAllByCondition(yearID, waterTypeID){
  $.ajax({
    url:pathbase+'/waterTypeandFeaturesTable/findWaterDataAllByCondition.do',
    type:'POST', //GET
    async:true, //true或false,是否异步,异步：true
    data:{ yearID: yearID, waterTypeID: waterTypeID }, //传递参数 
    timeout:5000,    //超时时间
    dataType:'json',    //返回的数据格式：json/xml/html/script/jsonp/text
    success:function(data,textStatus,jqXHR){
      isfindDataByCondition = true; //禁止无效查询
      var str = "";
      var allcount = 0;
      if(data.length > 0){
        for(var i = 0; i < data.length;i++){
          allcount += data[i].inventory1;
          allcount += data[i].inventory2;
          allcount += data[i].inventory3;
          allcount += data[i].inventory4;
          allcount += data[i].inventory5;
          allcount += data[i].inventory6;
          allcount += data[i].inventory7;
          allcount += data[i].inventory8;
        }
        $("#accWinReport tbody tr:nth-child(2) td:nth-child(2)").html(allcount + data[0].inventoryUnit);
      }
    },
    error:function(xhr,textStatus){
      isfindDataByCondition = true; //禁止无效查询
      console.log('findWaterValueDataByCondition()错误');
    }
  });
}

//核算结果统计表弹窗-价值量总统计
function findTypeValueDataByCondition(yearID, waterTypeID){
  $.ajax({
    url:pathbase+'/waterTypeandFeaturesTable/findTypeValueDataByCondition.do',
    type:'POST', //GET
    async:true, //true或false,是否异步,异步：true
    data:{ yearID: yearID, waterTypeID: waterTypeID }, //传递参数 
    timeout:5000,    //超时时间
    dataType:'json',    //返回的数据格式：json/xml/html/script/jsonp/text
    success:function(data,textStatus,jqXHR){
      var str = "";
      var allcount = 0;
      if(data.length > 0){
        for(var i = 0; i < data.length;i++){
          str += "<tr>" 
            + "<td>" + data[i].areaMC + "</td>"
            + "<td>" + data[i].landValue + "</td>"
            + "<td>" + data[i].waterValue + "</td>"
            + "<td>" + data[i].forestValue + "</td>"
            + "<td>" + data[i].mineValue + "</td>"
            + "<td>" + data[i].renewableValue + "</td>"
            + "<td>" + data[i].atmosphereValue + "</td>"
            + "<td></td>"
            + "<td></td>"
            + "</tr>"
        }
        $("#accWinReport-vl tbody").html(str);
        calculateValueAllCount(data);//计算合计和全市数据值
      }else{
        str = "<tr><td colspan='9'>暂无数据!</td></tr>";
        $("#accWinReport-vl tbody").html(str);
      }
    },
    error:function(xhr,textStatus){
      console.log('findTypeValueDataByCondition()错误');
    }
  });
}

//核算结果统计表弹窗-价值量总统计-计算合计和全市数据值
function calculateValueAllCount(data){
  var landValueAll = 0;
  var waterValueAll = 0;
  var forestValueAll = 0;
  var mineValueAll = 0;
  var renewableValueAll = 0;
  var atmosphereValueAll = 0;  
  for(var i=0;i<data.length;i++){
    landValueAll += data[i].landValue;
    waterValueAll += data[i].waterValue;
    forestValueAll += data[i].forestValue;
    mineValueAll += data[i].mineValue;
    renewableValueAll += data[i].renewableValue;
    atmosphereValueAll += data[i].atmosphereValue;
  }
  var str = "<tr>"
    + "<td>全市</td>"
    + "<td>" + landValueAll + "</td>"
    + "<td>" + waterValueAll + "</td>"
    + "<td>" + forestValueAll + "</td>"
    + "<td>" + mineValueAll + "</td>"
    + "<td>" + renewableValueAll + "</td>"
    + "<td>" + atmosphereValueAll + "</td>"
    + "<td></td>"
    + "<td></td>"
    + "</tr>";
  $("#accWinReport-vl tbody").append(str);//合并全市数据量
  //计算合计1、合计2数量
  var trs = $("#accWinReport-vl tbody tr");
  for(var i=0;i<trs.length;i++){
    var allCount1 = 0;
    var allCount2 = 0; 
    var val1 = Number($(trs[i]).children("td:nth-child(2)").text());
    allCount1 += val1;
    var val2 = Number($(trs[i]).children("td:nth-child(3)").text());
    allCount1 += val2;
    var val3 = Number($(trs[i]).children("td:nth-child(4)").text());
    allCount1 += val3;
    var val4 = Number($(trs[i]).children("td:nth-child(5)").text());
    allCount1 += val4;
    allCount2 += allCount1;
    var val5 = Number($(trs[i]).children("td:nth-child(6)").text());
    allCount2 += val5;
    var val6 = Number($(trs[i]).children("td:nth-child(7)").text());
    allCount2 += val6;
    $("#accWinReport-vl tbody tr:nth-child(" + (i+1) + ") td:nth-child(2)").html(transitionNumToShortMillion(val1,5)); //6种资源
    $("#accWinReport-vl tbody tr:nth-child(" + (i+1) + ") td:nth-child(3)").html(transitionNumToShortMillion(val2,5)); //
    $("#accWinReport-vl tbody tr:nth-child(" + (i+1) + ") td:nth-child(4)").html(transitionNumToShortMillion(val3,5)); //
    $("#accWinReport-vl tbody tr:nth-child(" + (i+1) + ") td:nth-child(5)").html(transitionNumToShortMillion(val4,5)); //
    $("#accWinReport-vl tbody tr:nth-child(" + (i+1) + ") td:nth-child(6)").html(transitionNumToShortMillion(val5,5)); //
    $("#accWinReport-vl tbody tr:nth-child(" + (i+1) + ") td:nth-child(7)").html(transitionNumToShortMillion(val6,5)); //
    $("#accWinReport-vl tbody tr:nth-child(" + (i+1) + ") td:nth-child(8)").html(transitionNumToShortMillion(allCount1,5)); //合计1
    $("#accWinReport-vl tbody tr:nth-child(" + (i+1) + ") td:nth-child(9)").html(transitionNumToShortMillion(allCount2,5)); //合计2
  }
  resetAllValTableBySelectArea();//隐藏区县列
}

//水资源明细查询---查询水资源实物量
function findWaterDataByCondition(yearID, waterTypeID){
  $.ajax({
    url:pathbase+'/waterTypeandFeaturesTable/findWaterDataByCondition.do',
    type:'POST', //GET
    async:true, //true或false,是否异步,异步：true
    data:{ yearID: yearID, waterTypeID: waterTypeID }, //传递参数 
    timeout:5000,    //超时时间
    dataType:'json',    //返回的数据格式：json/xml/html/script/jsonp/text
    success:function(data,textStatus,jqXHR){
      isfindDataByCondition = true;
      var str = "";
      if(data.length > 0){
        for(var i = 0; i < data.length;i++){
          str += "<tr>"
            + "<td>" + data[i].waterFeatures + "</td>"
            + "<td>" + data[i].inventory1 + "</td>"
            + "<td>" + data[i].inventory2 + "</td>"
            + "<td>" + data[i].inventory3 + "</td>"
            + "<td>" + data[i].inventory4 + "</td>"
            + "<td>" + data[i].inventory5 + "</td>"
            + "<td>" + data[i].inventory6 + "</td>"
            + "<td>" + data[i].inventory7 + "</td>"
            + "<td>" + data[i].inventory8 + "</td>"
            + "<td></td>"
            + "<td>" + data[i].inventoryUnit + "</td>"
            + "</tr>";
        }
      }else{
        str = "<tr><td colspan='11'>暂无数据，请选择其他条件查看!</td></tr>";
      }
      $("#accWinReport-mx-tb-water tbody").html(str);
      totalMxAllAreaCount("accWinReport-mx-tb-water");//明细合计
    },
    error:function(xhr,textStatus){
      isfindDataByCondition = true;
      console.log('findWaterDataByCondition()错误');
    }
  });
}

//水资源明细查询---查询水资源价值量
function findWaterValueDataByCondition(yearID, waterTypeID){
  if(isfindDataByCondition){ //禁止无效查询
    isfindDataByCondition = false; 
    $.ajax({
      url:pathbase+'/waterTypeandFeaturesTable/findWaterValueDataByCondition.do',
      type:'POST', //GET
      async:true, //true或false,是否异步,异步：true
      data:{ yearID: yearID, waterTypeID: waterTypeID }, //传递参数 
      timeout:5000,    //超时时间
      dataType:'json',    //返回的数据格式：json/xml/html/script/jsonp/text
      success:function(data,textStatus,jqXHR){
        isfindDataByCondition = true;
        var str = "";
        if(data.length > 0){
          if(useDataAllType == 1){
            for(var i = 0; i < data.length;i++){
              str += "<tr>"
                + "<td>" + data[i].waterFeatures + "</td>"
                + "<td>" + data[i].inventory1 + "</td>"
                + "<td>" + data[i].inventory2 + "</td>"
                + "<td>" + data[i].inventory3 + "</td>"
                + "<td>" + data[i].inventory4 + "</td>"
                + "<td>" + data[i].inventory5 + "</td>"
                + "<td>" + data[i].inventory6 + "</td>"
                + "<td>" + data[i].inventory7 + "</td>"
                + "<td>" + data[i].inventory8 + "</td>"
                + "<td></td>"
                + "<td>" + data[i].inventoryUnit + "</td>"
                + "</tr>";
            }
            $("#accWinReport-mx-tb-water tbody").html(str);
            totalMxAllAreaCount("accWinReport-mx-tb-water");//明细合计
          }else if(useDataAllType == 2){
            publicData = data;
            //var type = $("#select-statistics option:selected").val();
            var type = getRadioCkType("ra-chart-type");
            createChartByType(type); //统计图
          }
        }else{
          if(useDataAllType == 1){
            str = "<tr><td colspan='11'>暂无数据，请选择其他条件查看!</td></tr>";
            $("#accWinReport-mx-tb-water tbody").html(str);
          }else if(useDataAllType == 2){
            tipMapStaticsNoData("暂无数据，请选择其他条件查看!");//提示无数据
            accountingResourceReturn();
          }
        }
      },
      error:function(xhr,textStatus){
        isfindDataByCondition = true;
        console.log('findWaterValueDataByCondition()错误');
      }
    });
  }
}

//土地资源明细查询---查询土地资源实物量
function findLandDataByCondition(yearID, waterTypeID){
  $.ajax({
    url:pathbase+'/waterTypeandFeaturesTable/findLandDataByCondition.do',
    type:'POST', //GET
    async:true, //true或false,是否异步,异步：true
    data:{ yearID: yearID, waterTypeID: waterTypeID }, //传递参数 
    timeout:5000,    //超时时间
    dataType:'json',    //返回的数据格式：json/xml/html/script/jsonp/text
    success:function(data,textStatus,jqXHR){
      isfindDataByCondition = true;
      var str = "";
      if(data.length > 0){
        for(var i = 0; i < data.length;i++){
          str += "<tr>"
            + "<td>" + data[i].waterFeatures + "</td>"
            + "<td>" + data[i].inventory1 + "</td>"
            + "<td>" + data[i].inventory2 + "</td>"
            + "<td>" + data[i].inventory3 + "</td>"
            + "<td>" + data[i].inventory4 + "</td>"
            + "<td>" + data[i].inventory5 + "</td>"
            + "<td>" + data[i].inventory6 + "</td>"
            + "<td>" + data[i].inventory7 + "</td>"
            + "<td>" + data[i].inventory8 + "</td>"
            + "<td></td>"
            + "<td>" + data[i].inventoryUnit + "</td>"
            + "</tr>";
        }
      }else{
        str = "<tr><td colspan='11'>暂无数据，请选择其他条件查看!</td></tr>";
      }
      $("#accWinReport-mx-tb-land tbody").html(str);
      totalMxAllAreaCount("accWinReport-mx-tb-land");//明细合计
    },
    error:function(xhr,textStatus){
      isfindDataByCondition = true;
      console.log('findLandDataByCondition()错误');
    }
  });
}

//土地资源明细查询---查询土地资源价值量
function findLandValueDataByCondition(yearID, waterTypeID){
  $.ajax({
    url:pathbase+'/waterTypeandFeaturesTable/findLandValueDataByCondition.do',
    type:'POST', //GET
    async:true, //true或false,是否异步,异步：true
    data:{ yearID: yearID, waterTypeID: waterTypeID }, //传递参数 
    timeout:5000,    //超时时间
    dataType:'json',    //返回的数据格式：json/xml/html/script/jsonp/text
    success:function(data,textStatus,jqXHR){
      isfindDataByCondition = true;
      var str = "";
      if(data.length > 0){
        if(useDataAllType == 1){
          for(var i = 0; i < data.length;i++){
            str += "<tr>"
              + "<td>" + data[i].waterFeatures + "</td>"
              + "<td>" + data[i].inventory1 + "</td>"
              + "<td>" + data[i].inventory2 + "</td>"
              + "<td>" + data[i].inventory3 + "</td>"
              + "<td>" + data[i].inventory4 + "</td>"
              + "<td>" + data[i].inventory5 + "</td>"
              + "<td>" + data[i].inventory6 + "</td>"
              + "<td>" + data[i].inventory7 + "</td>"
              + "<td>" + data[i].inventory8 + "</td>"
              + "<td></td>"
              + "<td>" + data[i].inventoryUnit + "</td>"
              + "</tr>";
          }
          $("#accWinReport-mx-tb-land tbody").html(str);
          totalMxAllAreaCount("accWinReport-mx-tb-land");//明细合计
        }else if(useDataAllType == 2){
          publicData = data;
          //var type = $("#select-statistics option:selected").val();
          var type = getRadioCkType("ra-chart-type");
          createChartByType(type); //统计图
        }
      }else{
        if(useDataAllType == 1){
          str = "<tr><td colspan='11'>暂无数据，请选择其他条件查看!</td></tr>";
          $("#accWinReport-mx-tb-land tbody").html(str);
        }else if(useDataAllType == 2){
          tipMapStaticsNoData("暂无数据，请选择其他条件查看!");//提示无数据
          accountingResourceReturn();
        }
      }
    },
    error:function(xhr,textStatus){
      isfindDataByCondition = true;
      console.log('findLandValueDataByCondition()错误');
    }
  });
}

//林木资源明细查询---查询林木资源实物量
function findForestDataByCondition(yearID, waterTypeID){
  $.ajax({
    url:pathbase+'/waterTypeandFeaturesTable/findForestDataByCondition.do',
    type:'POST', //GET
    async:true, //true或false,是否异步,异步：true
    data:{ yearID: yearID, waterTypeID: waterTypeID }, //传递参数 
    timeout:5000,    //超时时间
    dataType:'json',    //返回的数据格式：json/xml/html/script/jsonp/text
    success:function(data,textStatus,jqXHR){
      isfindDataByCondition = true;
      var str = "";
      if(data.length > 0){
        for(var i = 0; i < data.length;i++){
          str += "<tr>"
            + "<td>" + data[i].waterFeatures + "</td>"
            + "<td>" + data[i].inventory1 + "</td>"
            + "<td>" + data[i].inventory2 + "</td>"
            + "<td>" + data[i].inventory3 + "</td>"
            + "<td>" + data[i].inventory4 + "</td>"
            + "<td>" + data[i].inventory5 + "</td>"
            + "<td>" + data[i].inventory6 + "</td>"
            + "<td>" + data[i].inventory7 + "</td>"
            + "<td>" + data[i].inventory8 + "</td>"
            + "<td></td>"
            + "<td>" + data[i].inventoryUnit + "</td>"
            + "</tr>";
        }
      }else{
        str = "<tr><td colspan='11'>暂无数据，请选择其他条件查看!</td></tr>";
      }
      $("#accWinReport-mx-tb-forest tbody").html(str);
      totalMxAllAreaCount("accWinReport-mx-tb-forest");//明细合计
    },
    error:function(xhr,textStatus){
      isfindDataByCondition = true;
      console.log('findForestDataByCondition()错误');
    }
  });
}

//林木资源明细查询---查询林木资源价值量
function findForestValueDataByCondition(yearID, waterTypeID){
  $.ajax({
    url:pathbase+'/waterTypeandFeaturesTable/findForestValueDataByCondition.do',
    type:'POST', //GET
    async:true, //true或false,是否异步,异步：true
    data:{ yearID: yearID, waterTypeID: waterTypeID }, //传递参数 
    timeout:5000,    //超时时间
    dataType:'json',    //返回的数据格式：json/xml/html/script/jsonp/text
    success:function(data,textStatus,jqXHR){
      isfindDataByCondition = true;
      var str = "";
      if(data.length > 0){
        if(useDataAllType == 1){
          for(var i = 0; i < data.length;i++){
            str += "<tr>"
              + "<td>" + data[i].waterFeatures + "</td>"
              + "<td>" + data[i].inventory1 + "</td>"
              + "<td>" + data[i].inventory2 + "</td>"
              + "<td>" + data[i].inventory3 + "</td>"
              + "<td>" + data[i].inventory4 + "</td>"
              + "<td>" + data[i].inventory5 + "</td>"
              + "<td>" + data[i].inventory6 + "</td>"
              + "<td>" + data[i].inventory7 + "</td>"
              + "<td>" + data[i].inventory8 + "</td>"
              + "<td></td>"
              + "<td>" + data[i].inventoryUnit + "</td>"
              + "</tr>";
          }
          $("#accWinReport-mx-tb-forest tbody").html(str);
          totalMxAllAreaCount("accWinReport-mx-tb-forest");//明细合计
        }else if(useDataAllType == 2){
          publicData = data;
          //var type = $("#select-statistics option:selected").val();
          var type = getRadioCkType("ra-chart-type");
          createChartByType(type); //统计图
        }
      }else{
        if(useDataAllType == 1){
          str = "<tr><td colspan='11'>暂无数据，请选择其他条件查看!</td></tr>";
          $("#accWinReport-mx-tb-forest tbody").html(str);
        }else if(useDataAllType == 2){
          tipMapStaticsNoData("暂无数据，请选择其他条件查看!");//提示无数据
          accountingResourceReturn();
        }
      }
    },
    error:function(xhr,textStatus){
      isfindDataByCondition = true;
      console.log('findForestValueDataByCondition()错误');
    }
  });
}

//矿产资源明细查询---查询矿产资源实物量
function findMineDataByCondition(yearID, waterTypeID){
  $.ajax({
    url:pathbase+'/waterTypeandFeaturesTable/findMineDataByCondition.do',
    type:'POST', //GET
    async:true, //true或false,是否异步,异步：true
    data:{ yearID: yearID, waterTypeID: waterTypeID }, //传递参数 
    timeout:5000,    //超时时间
    dataType:'json',    //返回的数据格式：json/xml/html/script/jsonp/text
    success:function(data,textStatus,jqXHR){
      isfindDataByCondition = true;
      var str = "";
      if(data.length > 0){
        for(var i = 0; i < data.length;i++){
          str += "<tr>"
            + "<td>" + data[i].waterFeatures + "</td>"
            + "<td>" + data[i].inventory1 + "</td>"
            + "<td>" + data[i].inventory2 + "</td>"
            + "<td>" + data[i].inventory3 + "</td>"
            + "<td>" + data[i].inventory4 + "</td>"
            + "<td>" + data[i].inventory5 + "</td>"
            + "<td>" + data[i].inventory6 + "</td>"
            + "<td>" + data[i].inventory7 + "</td>"
            + "<td>" + data[i].inventory8 + "</td>"
            + "<td></td>"
            + "<td>" + data[i].inventoryUnit + "</td>"
            + "</tr>";
        }
      }else{
        str = "<tr><td colspan='11'>暂无数据，请选择其他条件查看!</td></tr>";
      }
      $("#accWinReport-mx-tb-mine tbody").html(str);
      totalMxAllAreaCount("accWinReport-mx-tb-mine");//明细合计
    },
    error:function(xhr,textStatus){
      isfindDataByCondition = true;
      console.log('findMineDataByCondition()错误');
    }
  });
}

//矿产资源明细查询---查询矿产资源价值量
function findMineValueDataByCondition(yearID, waterTypeID){
  $.ajax({
    url:pathbase+'/waterTypeandFeaturesTable/findMineValueDataByCondition.do',
    type:'POST', //GET
    async:true, //true或false,是否异步,异步：true
    data:{ yearID: yearID, waterTypeID: waterTypeID }, //传递参数 
    timeout:5000,    //超时时间
    dataType:'json',    //返回的数据格式：json/xml/html/script/jsonp/text
    success:function(data,textStatus,jqXHR){
      isfindDataByCondition = true;
      var str = "";
      if(data.length > 0){
        if(useDataAllType == 1){
          for(var i = 0; i < data.length;i++){
            str += "<tr>"
              + "<td>" + data[i].waterFeatures + "</td>"
              + "<td>" + data[i].inventory1 + "</td>"
              + "<td>" + data[i].inventory2 + "</td>"
              + "<td>" + data[i].inventory3 + "</td>"
              + "<td>" + data[i].inventory4 + "</td>"
              + "<td>" + data[i].inventory5 + "</td>"
              + "<td>" + data[i].inventory6 + "</td>"
              + "<td>" + data[i].inventory7 + "</td>"
              + "<td>" + data[i].inventory8 + "</td>"
              + "<td></td>"
              + "<td>" + data[i].inventoryUnit + "</td>"
              + "</tr>";
          }
          $("#accWinReport-mx-tb-mine tbody").html(str);
          totalMxAllAreaCount("accWinReport-mx-tb-mine");//明细合计
        }else if(useDataAllType == 2){
          publicData = data;
          //var type = $("#select-statistics option:selected").val();
          var type = getRadioCkType("ra-chart-type");
          createChartByType(type); //统计图
        }
      }else{
        if(useDataAllType == 1){
          str = "<tr><td colspan='11'>暂无数据，请选择其他条件查看!</td></tr>";
          $("#accWinReport-mx-tb-mine tbody").html(str);
        }else if(useDataAllType == 2){
          tipMapStaticsNoData("暂无数据，请选择其他条件查看!");//提示无数据
          accountingResourceReturn();
        }
      }
    },
    error:function(xhr,textStatus){
      isfindDataByCondition = true;
      console.log('findMineValueDataByCondition()错误');
    }
  });
}

//可再生能源明细查询---查询可再生能源实物量
function findRenewableDataByCondition(yearID, waterTypeID){
  $.ajax({
    url:pathbase+'/waterTypeandFeaturesTable/findRenewableDataByCondition.do',
    type:'POST', //GET
    async:true, //true或false,是否异步,异步：true
    data:{ yearID: yearID, waterTypeID: waterTypeID }, //传递参数 
    timeout:5000,    //超时时间
    dataType:'json',    //返回的数据格式：json/xml/html/script/jsonp/text
    success:function(data,textStatus,jqXHR){
      isfindDataByCondition = true;
      var str = "";
      if(data.length > 0){
        for(var i = 0; i < data.length;i++){
          str += "<tr>"
            + "<td>" + data[i].waterFeatures + "</td>"
            + "<td>" + data[i].inventory1 + "</td>"
            + "<td>" + data[i].inventory2 + "</td>"
            + "<td>" + data[i].inventory3 + "</td>"
            + "<td>" + data[i].inventory4 + "</td>"
            + "<td>" + data[i].inventory5 + "</td>"
            + "<td>" + data[i].inventory6 + "</td>"
            + "<td>" + data[i].inventory7 + "</td>"
            + "<td>" + data[i].inventory8 + "</td>"
            + "<td></td>"
            + "<td>" + data[i].inventoryUnit + "</td>"
            + "</tr>";
        }
      }else{
        str = "<tr><td colspan='11'>暂无数据，请选择其他条件查看!</td></tr>";
      }
      $("#accWinReport-mx-tb-renewable tbody").html(str);
      totalMxAllAreaCount("accWinReport-mx-tb-renewable");//明细合计
    },
    error:function(xhr,textStatus){
      isfindDataByCondition = true;
      console.log('findRenewableDataByCondition()错误');
    }
  });
}

//可再生能源明细查询---查询可再生能源价值量
function findRenewableValueDataByCondition(yearID, waterTypeID){
  $.ajax({
    url:pathbase+'/waterTypeandFeaturesTable/findRenewableValueDataByCondition.do',
    type:'POST', //GET
    async:true, //true或false,是否异步,异步：true
    data:{ yearID: yearID, waterTypeID: waterTypeID }, //传递参数 
    timeout:5000,    //超时时间
    dataType:'json',    //返回的数据格式：json/xml/html/script/jsonp/text
    success:function(data,textStatus,jqXHR){
      isfindDataByCondition = true;
      var str = "";
      if(data.length > 0){
        if(useDataAllType == 1){
          for(var i = 0; i < data.length;i++){
            str += "<tr>"
              + "<td>" + data[i].waterFeatures + "</td>"
              + "<td>" + data[i].inventory1 + "</td>"
              + "<td>" + data[i].inventory2 + "</td>"
              + "<td>" + data[i].inventory3 + "</td>"
              + "<td>" + data[i].inventory4 + "</td>"
              + "<td>" + data[i].inventory5 + "</td>"
              + "<td>" + data[i].inventory6 + "</td>"
              + "<td>" + data[i].inventory7 + "</td>"
              + "<td>" + data[i].inventory8 + "</td>"
              + "<td></td>"
              + "<td>" + data[i].inventoryUnit + "</td>"
              + "</tr>";
          }
          $("#accWinReport-mx-tb-renewable tbody").html(str);
          totalMxAllAreaCount("accWinReport-mx-tb-renewable");//明细合计
        }else if(useDataAllType == 2){
          publicData = data;
          //var type = $("#select-statistics option:selected").val();
          var type = getRadioCkType("ra-chart-type");
          createChartByType(type); //统计图
        }
      }else{
        if(useDataAllType == 1){
          str = "<tr><td colspan='11'>暂无数据，请选择其他条件查看!</td></tr>";
          $("#accWinReport-mx-tb-renewable tbody").html(str);
        }else if(useDataAllType == 2){
          tipMapStaticsNoData("暂无数据，请选择其他条件查看!");//提示无数据
          accountingResourceReturn();
        }
      }
    },
    error:function(xhr,textStatus){
      isfindDataByCondition = true;
      console.log('findRenewableValueDataByCondition()错误');
    }
  });
}

//大气资源明细查询---查询大气资源实物量
function findAtmosphereDataByCondition(yearID, waterTypeID){
  $.ajax({
    url:pathbase+'/waterTypeandFeaturesTable/findAtmosphereDataByCondition.do',
    type:'POST', //GET
    async:true, //true或false,是否异步,异步：true
    data:{ yearID: yearID, waterTypeID: waterTypeID }, //传递参数 
    timeout:5000,    //超时时间
    dataType:'json',    //返回的数据格式：json/xml/html/script/jsonp/text
    success:function(data,textStatus,jqXHR){
      isfindDataByCondition = true;
      var str = "";
      if(data.length > 0){
        for(var i = 0; i < data.length;i++){
          str += "<tr>"
            + "<td>" + data[i].waterFeatures + "</td>"
            + "<td>" + data[i].inventory1 + "</td>"
            + "<td>" + data[i].inventory2 + "</td>"
            + "<td>" + data[i].inventory3 + "</td>"
            + "<td>" + data[i].inventory4 + "</td>"
            + "<td>" + data[i].inventory5 + "</td>"
            + "<td>" + data[i].inventory6 + "</td>"
            + "<td>" + data[i].inventory7 + "</td>"
            + "<td>" + data[i].inventory8 + "</td>"
            + "<td></td>"
            + "<td>" + data[i].inventoryUnit + "</td>"
            + "</tr>";
        }
      }else{
        str = "<tr><td colspan='11'>暂无数据，请选择其他条件查看!</td></tr>";
      }
      $("#accWinReport-mx-tb-atmosphere tbody").html(str);
      totalMxAllAreaCount("accWinReport-mx-tb-atmosphere");//明细合计
    },
    error:function(xhr,textStatus){
      isfindDataByCondition = true;
      console.log('findAtmosphereDataByCondition()错误');
    }
  });
}

//大气资源明细查询---查询大气资源价值量
function findAtmosphereValueDataByCondition(yearID, waterTypeID){
  $.ajax({
    url:pathbase+'/waterTypeandFeaturesTable/findAtmosphereValueDataByCondition.do',
    type:'POST', //GET
    async:true, //true或false,是否异步,异步：true
    data:{ yearID: yearID, waterTypeID: waterTypeID }, //传递参数 
    timeout:5000,    //超时时间
    dataType:'json',    //返回的数据格式：json/xml/html/script/jsonp/text
    success:function(data,textStatus,jqXHR){
      isfindDataByCondition = true;
      var str = "";
      if(data.length > 0){
        if(useDataAllType == 1){
          for(var i = 0; i < data.length;i++){
            str += "<tr>"
              + "<td>" + data[i].waterFeatures + "</td>"
              + "<td>" + data[i].inventory1 + "</td>"
              + "<td>" + data[i].inventory2 + "</td>"
              + "<td>" + data[i].inventory3 + "</td>"
              + "<td>" + data[i].inventory4 + "</td>"
              + "<td>" + data[i].inventory5 + "</td>"
              + "<td>" + data[i].inventory6 + "</td>"
              + "<td>" + data[i].inventory7 + "</td>"
              + "<td>" + data[i].inventory8 + "</td>"
              + "<td></td>"
              + "<td>" + data[i].inventoryUnit + "</td>"
              + "</tr>";
          }
          $("#accWinReport-mx-tb-atmosphere tbody").html(str);
          totalMxAllAreaCount("accWinReport-mx-tb-atmosphere");//明细合计
        }else if(useDataAllType == 2){
          publicData = data;
          //var type = $("#select-statistics option:selected").val();
          var type = getRadioCkType("ra-chart-type");
          createChartByType(type); //统计图
        }
      }else{
        if(useDataAllType == 1){
          str = "<tr><td colspan='11'>暂无数据，请选择其他条件查看!</td></tr>";
          $("#accWinReport-mx-tb-atmosphere tbody").html(str);
        }else if(useDataAllType == 2){
          tipMapStaticsNoData("暂无数据，请选择其他条件查看!");//提示无数据
          accountingResourceReturn();
        }
      }
    },
    error:function(xhr,textStatus){
      isfindDataByCondition = true;
      console.log('findAtmosphereValueDataByCondition()错误');
    }
  });
}

//明细合计
function totalMxAllAreaCount(table){
  var trs = $("#" + table + " tbody tr");
  if($(trs[0]).children("td").length > 1){ //判断是不是有数据
    var val1=0,val2=0,val3=0,val4=0,val5=0,val6=0,val7=0,val8=0,unit;
    for(var i=0;i<trs.length;i++){
      //竖合计
      var text1 = Number($(trs[i]).children("td:nth-child(2)").text());
      val1 += text1;
      var text2 = Number($(trs[i]).children("td:nth-child(3)").text());
      val2 += text2;
      var text3 = Number($(trs[i]).children("td:nth-child(4)").text());
      val3 += text3;
      var text4 = Number($(trs[i]).children("td:nth-child(5)").text());
      val4 += text4;
      var text5 = Number($(trs[i]).children("td:nth-child(6)").text());
      val5 += text5;
      var text6 = Number($(trs[i]).children("td:nth-child(7)").text());
      val6 += text6;
      var text7 = Number($(trs[i]).children("td:nth-child(8)").text());
      val7 += text7;
      var text8 = Number($(trs[i]).children("td:nth-child(9)").text());
      val8 += text8;
      //横合计
      var allTextCount = text1 + text2 + text3 + text4 + text5 + text6 + text7 + text8;
      $(trs[i]).children("td:nth-child(10)").text(transitionNumToShortMillion(allTextCount,5));
      //转带“亿”
      $(trs[i]).children("td:nth-child(2)").text(transitionNumToShortMillion(text1,5));
      $(trs[i]).children("td:nth-child(3)").text(transitionNumToShortMillion(text2,5));
      $(trs[i]).children("td:nth-child(4)").text(transitionNumToShortMillion(text3,5));
      $(trs[i]).children("td:nth-child(5)").text(transitionNumToShortMillion(text4,5));
      $(trs[i]).children("td:nth-child(6)").text(transitionNumToShortMillion(text5,5));
      $(trs[i]).children("td:nth-child(7)").text(transitionNumToShortMillion(text6,5));
      $(trs[i]).children("td:nth-child(8)").text(transitionNumToShortMillion(text7,5));
      $(trs[i]).children("td:nth-child(9)").text(transitionNumToShortMillion(text8,5));
    }
    //可再生能源不能竖合计，单位不一致; 行数大于2行才竖合计
    if(table != "accWinReport-mx-tb-renewable" && trs.length > 1){ 
      unit = $(trs[0]).children("td:nth-child(11)").text();//单位
      var allVal = val1 + val2 + val3 + val4 + val5 + val6 + val7 + val8; //总数
      var str = "<tr>"
        + "<td>合计</td>"
        + "<td>" + transitionNumToShortMillion(val1,5) + "</td>"
        + "<td>" + transitionNumToShortMillion(val2,5) + "</td>"
        + "<td>" + transitionNumToShortMillion(val3,5) + "</td>"
        + "<td>" + transitionNumToShortMillion(val4,5) + "</td>"
        + "<td>" + transitionNumToShortMillion(val5,5) + "</td>"
        + "<td>" + transitionNumToShortMillion(val6,5) + "</td>"
        + "<td>" + transitionNumToShortMillion(val7,5) + "</td>"
        + "<td>" + transitionNumToShortMillion(val8,5) + "</td>"
        + "<td>" + transitionNumToShortMillion(allVal,5) + "</td>"
        + "<td>" + unit + "</td>"
        + "</tr>";
      $("#" + table + " tbody").append(str);
    }
    resetMxTableBySelectArea(table);//隐藏区县列
  }
}

//价值量总统计表---选择区县下拉框后数据表格处理
function resetAllValTableBySelectArea(){
  var areaID = $("#accWinReport-vl-sel-area option:selected").val();
  hideAllValOtherAreaData(areaID);
}

//价值量总统计表---隐藏其他区县行列
function hideAllValOtherAreaData(areaID){
  var trs = $("#accWinReport-vl tbody tr");
  if(areaID != 9){
    //全部隐藏
    for(var i=0;i<trs.length;i++){
      $(trs[i]).children("td").hide();
    }
    //显示选择区县
    $(trs[areaID-1]).children("td").show();
  }else{
    //全部显示
    for(var i=0;i<trs.length;i++){
      $(trs[i]).children("td").show();
    }
  }
}

//明细统计表---选择区县下拉框后数据表格处理
function resetMxTableBySelectArea(table){
  var areaID;
  switch(table){
    case "accWinReport-mx-tb-land":
      areaID = $("#acc-mx-tb-sel-area-land option:selected").val();
      break;
    case "accWinReport-mx-tb-water":
      areaID = $("#acc-mx-tb-sel-area-water option:selected").val();
      break;
    case "accWinReport-mx-tb-forest":
      areaID = $("#acc-mx-tb-sel-area-forest option:selected").val();
      break;
    case "accWinReport-mx-tb-mine":
      areaID = $("#acc-mx-tb-sel-area-mine option:selected").val();
      break;
    case "accWinReport-mx-tb-renewable":
      areaID = $("#acc-mx-tb-sel-area-renewable option:selected").val();
      break;
    case "accWinReport-mx-tb-atmosphere":
      areaID = $("#acc-mx-tb-sel-area-atmosphere option:selected").val();
      break;
    default:
      break;
  }
  hideMxOtherAreaData(table,areaID)
}

//明细统计表---隐藏其他区县行列
function hideMxOtherAreaData(table,areaID){
  var ths = $("#"+table+" thead tr:nth-child(2)").children("th");
  var trs = $("#"+table+" tbody tr");
  if(areaID != 9 && $(trs[0]).children("td").length>1){
    //全部隐藏
    $(ths).hide(); //表头
    for(var i=0;i<trs.length;i++){
      $(trs[i]).children("td").hide();
    }
    //显示选择区县
    $("#"+table+" thead tr:nth-child(1)").children("th:nth-child(1)").attr("colspan", "2");
    $("#"+table+" thead tr:nth-child(2)").children("th:nth-child(1)").show();//第1列默认显示
    $("#"+table+" thead tr:nth-child(2)").children("th:nth-child("+(Number(areaID)+1)+")").show();
    for(var i=0;i<trs.length;i++){
      $(trs[i]).children("td:nth-child(1)").show();//第1列默认显示
      $(trs[i]).children("td:nth-child("+(Number(areaID)+1)+")").show();
    }
  }else{
    //全部显示
    $("#"+table+" thead tr:nth-child(1)").children("th:nth-child(1)").attr("colspan", "11");
    $(ths).show(); //表头
    for(var i=0;i<trs.length;i++){
      $(trs[i]).children("td").show();
    }
  }
}

//========================核算统计表弹窗查询End========================

//====================================核算对比展示Start===================================
//核算对比展示~~水资源~~各区县实物量查询-接口
var valueData,allvalueCount = 0; 
function findWaterDataAllByConditionCon(yearID, waterTypeID, tbname,one,two){
  $.ajax({
    url:pathbase+'/waterTypeandFeaturesTable/findWaterDataAllByCondition.do',
    type:'POST', //GET
    async:true, //true或false,是否异步,异步：true
    data:{ yearID: yearID, waterTypeID: waterTypeID }, //传递参数 
    timeout:5000,    //超时时间
    dataType:'json',    //返回的数据格式：json/xml/html/script/jsonp/text
    success:function(data,textStatus,jqXHR){
      isfindDataByCondition = true;
      var str = "";
      var allcount = 0;      
      if(data.length > 0){
        for(var i = 0; i < data.length;i++){
          allcount += data[i].inventory1;
          allcount += data[i].inventory2;
          allcount += data[i].inventory3;
          allcount += data[i].inventory4;
          allcount += data[i].inventory5;
          allcount += data[i].inventory6;
          allcount += data[i].inventory7;
          allcount += data[i].inventory8;
          str += "<tr>"
            + "<td>梅江区</td>"
            + "<td>"+data[i].inventory1+"</td>"
            + "<td>"+valueData[i].inventory1+"</td>"
            + "</tr><tr><td>梅县区</td>"
            + "<td>"+data[i].inventory2+"</td>"
            + "<td>"+valueData[i].inventory2+"</td>"
            + "</tr><tr><td>兴宁市</td>"
            + "<td>"+data[i].inventory3+"</td>"
            + "<td>"+valueData[i].inventory3+"</td>"
            + "</tr><tr><td>平远县</td>"
            + "<td>"+data[i].inventory4+"</td>"
            + "<td>"+valueData[i].inventory4+"</td>"
            + "</tr><tr><td>蕉岭县</td>"
            + "<td>"+data[i].inventory5+"</td>"
            + "<td>"+valueData[i].inventory5+"</td>"
            + "</tr><tr><td>大埔县</td>"
            + "<td>"+data[i].inventory6+"</td>"
            + "<td>"+valueData[i].inventory6+"</td>"
            + "</tr><tr><td>丰顺县</td>"
            + "<td>"+data[i].inventory7+"</td>"
            + "<td>"+valueData[i].inventory7+"</td>"
            + "</tr><tr><td>五华县</td>"
            + "<td>"+data[i].inventory8+"</td>"
            + "<td>"+valueData[i].inventory8+"</td>"
            + "</tr>"
            + "</tr><tr><td>全市</td>"
            + "<td>"+allcount+"</td>"
            + "<td>"+allvalueCount+"</td>"
            + "</tr>";
        }
        $("#" + tbname + " tbody").html(str);             
        if(one == 1 && two == 1){
          var yearID2 = $('#accCtYearTwoSelect option:selected').val();//年份
          findWaterDataAllByConditionCon(yearID2, 0, "accContrastshow-tbtwo",0,0);//不需要再查询
        }else {
          selConPercentage();//两个表格查询完毕，计算相差百分比
        }
      }
    },
    error:function(xhr,textStatus){
      isfindDataByCondition = true;
      console.log('findWaterDataAllByConditionCon()错误');
    }
  });
}

//核算对比展示~水资源~~各区县价值量数据查询-接口
function findWaterValueDataAllByConditionCon(yearID, waterTypeID, tbname,one,two){
  $.ajax({
    url:pathbase+'/waterTypeandFeaturesTable/findWaterValueDataAllByCondition.do',
    type:'POST', //GET
    async:true, //true或false,是否异步,异步：true
    data:{ yearID: yearID, waterTypeID: waterTypeID }, //传递参数 
    timeout:5000,    //超时时间
    dataType:'json',    //返回的数据格式：json/xml/html/script/jsonp/text
    success:function(data,textStatus,jqXHR){
      isfindDataByCondition = true;
      unityBindComparisonTablie(data,yearID, waterTypeID, tbname,one,two);//统一绑定表格数据
    },
    error:function(xhr,textStatus){
      isfindDataByCondition = true;
      console.log('findWaterValueDataAllByConditionCon()错误');
    }
  });
}

//核算对比展示~土地资源~~各区县价值量数据查询-接口
function findLandValueDataAllByConditionCon(yearID, waterTypeID, tbname,one,two){
  $.ajax({
    url:pathbase+'/waterTypeandFeaturesTable/findLandValueDataAllByCondition.do',
    type:'POST', //GET
    async:true, //true或false,是否异步,异步：true
    data:{ yearID: yearID, waterTypeID: waterTypeID }, //传递参数 
    timeout:5000,    //超时时间
    dataType:'json',    //返回的数据格式：json/xml/html/script/jsonp/text
    success:function(data,textStatus,jqXHR){
      isfindDataByCondition = true;
      unityBindComparisonTablie(data,yearID, waterTypeID, tbname,one,two);//统一绑定表格数据
    },
    error:function(xhr,textStatus){
      isfindDataByCondition = true;
      console.log('findLandValueDataAllByConditionCon()错误');
    }
  });
}

//核算对比展示~林木资源~~各区县价值量数据查询-接口
function findForestValueDataAllByConditionCon(yearID, waterTypeID, tbname,one,two){
  $.ajax({
    url:pathbase+'/waterTypeandFeaturesTable/findForestValueDataAllByCondition.do',
    type:'POST', //GET
    async:true, //true或false,是否异步,异步：true
    data:{ yearID: yearID, waterTypeID: waterTypeID }, //传递参数 
    timeout:5000,    //超时时间
    dataType:'json',    //返回的数据格式：json/xml/html/script/jsonp/text
    success:function(data,textStatus,jqXHR){
      isfindDataByCondition = true;
      unityBindComparisonTablie(data,yearID, waterTypeID, tbname,one,two);//统一绑定表格数据
    },
    error:function(xhr,textStatus){
      isfindDataByCondition = true;
      console.log('findForestValueDataAllByConditionCon()错误');
    }
  });
}

//核算对比展示~矿产资源~~各区县价值量数据查询-接口
function findMineValueDataAllByConditionCon(yearID, waterTypeID, tbname,one,two){
  $.ajax({
    url:pathbase+'/waterTypeandFeaturesTable/findMineValueDataAllByCondition.do',
    type:'POST', //GET
    async:true, //true或false,是否异步,异步：true
    data:{ yearID: yearID, waterTypeID: waterTypeID }, //传递参数 
    timeout:5000,    //超时时间
    dataType:'json',    //返回的数据格式：json/xml/html/script/jsonp/text
    success:function(data,textStatus,jqXHR){
      isfindDataByCondition = true;
      unityBindComparisonTablie(data,yearID, waterTypeID, tbname,one,two);//统一绑定表格数据
    },
    error:function(xhr,textStatus){
      isfindDataByCondition = true;
      console.log('findMineValueDataAllByConditionCon()错误');
    }
  });
}

//核算对比展示~可再生能源~~各区县价值量数据查询-接口
function findRenewableValueDataAllByConditionCon(yearID, waterTypeID, tbname,one,two){
  $.ajax({
    url:pathbase+'/waterTypeandFeaturesTable/findRenewableValueDataAllByCondition.do',
    type:'POST', //GET
    async:true, //true或false,是否异步,异步：true
    data:{ yearID: yearID, waterTypeID: waterTypeID }, //传递参数 
    timeout:5000,    //超时时间
    dataType:'json',    //返回的数据格式：json/xml/html/script/jsonp/text
    success:function(data,textStatus,jqXHR){
      isfindDataByCondition = true;
      unityBindComparisonTablie(data,yearID, waterTypeID, tbname,one,two);//统一绑定表格数据
    },
    error:function(xhr,textStatus){
      isfindDataByCondition = true;
      console.log('findMineValueDataAllByConditionCon()错误');
    }
  });
}

//核算对比展示~大气资源~~各区县价值量数据查询-接口
function findAtmosphereValueDataAllByConditionCon(yearID, waterTypeID, tbname,one,two){
  $.ajax({
    url:pathbase+'/waterTypeandFeaturesTable/findAtmosphereValueDataAllByCondition.do',
    type:'POST', //GET
    async:true, //true或false,是否异步,异步：true
    data:{ yearID: yearID, waterTypeID: waterTypeID }, //传递参数 
    timeout:5000,    //超时时间
    dataType:'json',    //返回的数据格式：json/xml/html/script/jsonp/text
    success:function(data,textStatus,jqXHR){
      isfindDataByCondition = true;
      unityBindComparisonTablie(data,yearID, waterTypeID, tbname,one,two);//统一绑定表格数据
    },
    error:function(xhr,textStatus){
      isfindDataByCondition = true;
      console.log('findAtmosphereValueDataAllByConditionCon()错误');
    }
  });
}

//核算对比展示~~统一绑定表格
function unityBindComparisonTablie(data,yearID, waterTypeID, tbname,one,two){
  var str = "";
  var allcount = 0;      
  if(data.length > 0){
    for(var i = 0; i < data.length;i++){
      allcount += data[i].inventory1;
      allcount += data[i].inventory2;
      allcount += data[i].inventory3;
      allcount += data[i].inventory4;
      allcount += data[i].inventory5;
      allcount += data[i].inventory6;
      allcount += data[i].inventory7;
      allcount += data[i].inventory8;
      str += "<tr>"
        + "<td>梅江区</td>"
        + "<td>"+transitionNumToShortMillion(data[i].inventory1,5)+"</td>"
        + "</tr><tr><td>梅县区</td>"
        + "<td>"+transitionNumToShortMillion(data[i].inventory2,5)+"</td>"
        + "</tr><tr><td>兴宁市</td>"
        + "<td>"+transitionNumToShortMillion(data[i].inventory3,5)+"</td>"
        + "</tr><tr><td>平远县</td>"
        + "<td>"+transitionNumToShortMillion(data[i].inventory4,5)+"</td>"
        + "</tr><tr><td>蕉岭县</td>"
        + "<td>"+transitionNumToShortMillion(data[i].inventory5,5)+"</td>"
        + "</tr><tr><td>大埔县</td>"
        + "<td>"+transitionNumToShortMillion(data[i].inventory6,5)+"</td>"
        + "</tr><tr><td>丰顺县</td>"
        + "<td>"+transitionNumToShortMillion(data[i].inventory7,5)+"</td>"
        + "</tr><tr><td>五华县</td>"
        + "<td>"+transitionNumToShortMillion(data[i].inventory8,5)+"</td>"
        + "</tr>"
        + "</tr><tr><td>全市</td>"
        + "<td>"+transitionNumToShortMillion(allcount,5)+"</td>"
        + "</tr>";
    }
    $("#" + tbname + " tbody").html(str);             
    //查询第2个表格数据
    if(one == 1 && two == 1){
      selYearConCh(0,1,false)//再查询第二张表
    }else {
      selConPercentage();//两个表格查询完毕，计算相差百分比
    }
  }
}

//核算对比展示-相差绝对值-百分比计算
function selConPercentage(){
  var onebody = $("#accContrastshow-tbone tbody").html().trim();
  var twobody = $("#accContrastshow-tbtwo tbody").html().trim();
  if(onebody != "" && twobody != ""){
    var trs1 = $("#accContrastshow-tbone tbody tr");
    var trs2 = $("#accContrastshow-tbtwo tbody tr");
    var str="";
    for(var i=0;i<(trs1.length-1);i++){
      var percentage = 0, differ = 0;
      var areavalue1 = reversalShortNumToLong($(trs1[i]).children('td:eq(1)').text());
      var areavalue2 = reversalShortNumToLong($(trs2[i]).children('td:eq(1)').text());
      differ = Number(areavalue2)-Number(areavalue1); //相差量
      percentage = (Number(areavalue2)-Number(areavalue1)) / Number(areavalue1) * 100; //(2-1)/1 相差百分比
      if(Number(areavalue2) < Number(areavalue1) && percentage > 0.0000){
        percentage = -percentage;
      }
      if(areavalue1 == 0 && areavalue2 == 0){
        percentage = 0;
      }else if(areavalue1 != 0 && areavalue2 == 0){
        percentage = -100;
      }else if(areavalue1 == 0 && areavalue2 != 0){
        percentage = 100;
      }
      str += "<tr>"
        + "<td>" + transitionNumToShortMillion(differ,5) + "</td>"
        + "<td>" + roundWantNum(percentage,3) + "%</td>"
        + "</tr>";
    }
    var oneAllvalue = reversalShortNumToLong($("#accContrastshow-tbone tbody tr:nth-child("+ trs1.length +") td:nth-child(2)").text());
    var twoAllvalue = reversalShortNumToLong($("#accContrastshow-tbtwo tbody tr:nth-child("+ trs1.length +") td:nth-child(2)").text());
    var allDiffer = Number(twoAllvalue)-Number(oneAllvalue);
    var allPercentage = (Number(twoAllvalue)-Number(oneAllvalue)) / Number(oneAllvalue) * 100; //(2-1)/1 百分比
    if(Number(twoAllvalue) < Number(oneAllvalue) && allPercentage > 0.0000){
      allPercentage = -allPercentage;
    }
    if(oneAllvalue == 0 && twoAllvalue == 0){
      allPercentage = 0;
    }else if(oneAllvalue != 0 && twoAllvalue == 0){
      allPercentage = -100;
    }else if(oneAllvalue == 0 && twoAllvalue != 0){
      allPercentage = 100;
    }
    str += "<tr>"
      + "<td>" + transitionNumToShortMillion(allDiffer,5) + "</td>"
      + "<td>" + roundWantNum(allPercentage,3) + "%</td>"
      + "</tr>";
    $("#accContrastshow-tbthree tbody").html(str);
    //根据资源类型判断选择年份下拉框
    var year1 = "";
    var year2 = "";
    var restypeid = $('#accCtResSelect option:selected').val();//资源类型
    switch(Number(restypeid)){
      case 1:
        //查询土地资源
        year1 = $("#accCtYearOneSelect1 option:selected").text();
        year2 = $("#accCtYearTwoSelect1 option:selected").text();
        break;
      case 2:
        //查询水资源
        year1 = $("#accCtYearOneSelect2 option:selected").text();
        year2 = $("#accCtYearTwoSelect2 option:selected").text();
        break;
      case 3:
        //查询林木资源
        year1 = $("#accCtYearOneSelect3 option:selected").text();
        year2 = $("#accCtYearTwoSelect3 option:selected").text();
        break;
      case 4:
        //查询矿产资源
        year1 = $("#accCtYearOneSelect4 option:selected").text();
        year2 = $("#accCtYearTwoSelect4 option:selected").text();
        break;
      case 5:
        //查询可再生能源
        year1 = $("#accCtYearOneSelect5 option:selected").text();
        year2 = $("#accCtYearTwoSelect5 option:selected").text();
        break;
      case 6:
        //查询大气资源
        year1 = $("#accCtYearOneSelect6 option:selected").text();
        year2 = $("#accCtYearTwoSelect6 option:selected").text();
        break;
      default:
        break;
    }    
    $("#accContrastshow-tbone thead tr:nth-child(1) th:nth-child(1)").text(year1);
    $("#accContrastshow-tbtwo thead tr:nth-child(1) th:nth-child(1)").text(year2);
    $("#accContrastshow-tbthree thead tr:nth-child(1) th:nth-child(1)").html(year1 + " - " + year2); //表头标题
    isbaDifSortDataTable = false;//重新绑定数据源，需要备份
    //判断是否排序
    if($("#difPercentageSortValCk").attr('checked')){
      difPercentageSort(2);//根据变化量，从大到小重新排序数据
    }else if($("#difPercentageSortPerCk").attr('checked')){
      difPercentageSort(3);//根据变化百分比，从大到小重新排序数据
    }
  }
}

//根据CheckBox选择，是否排序
var baDifSortDataTable=null, isbaDifSortDataTable = false;//根据是否更新了数据源判断是否需要备份数据
function difPercentageSortChange(index){
  if(index == 1){
    if($("#difPercentageSortValCk").attr('checked')){
      $("#difPercentageSortPerCk").prop("checked",false);
      difPercentageSort(2);
    }else {
      returnDifSortDataTable();//把保存的行列重新赋值还原
    }
  }else {
    if($("#difPercentageSortPerCk").attr('checked')){
      $("#difPercentageSortValCk").prop("checked",false);
      difPercentageSort(3);
    }else {
      returnDifSortDataTable();//把保存的行列重新赋值还原
    }
  }
}

//把保存的行列重新赋值还原
function returnDifSortDataTable(){
  var trs1 = $("#accContrastshow-tbone tbody tr");
  var trs2 = $("#accContrastshow-tbtwo tbody tr");
  var trs3 = $("#accContrastshow-three tbody tr");
  for(var i=0;i<baDifSortDataTable.length;i++){
    var tdtext1 = $(baDifSortDataTable[i]).children("td:nth-child(1)").text();
    var tdtext2 = $(baDifSortDataTable[i]).children("td:nth-child(2)").text();
    var tdtext3 = $(baDifSortDataTable[i]).children("td:nth-child(3)").text();
    var tdtext4 = $(baDifSortDataTable[i]).children("td:nth-child(4)").text();
    var tdtext5 = $(baDifSortDataTable[i]).children("td:nth-child(5)").text();
    $(trs1[i]).children("td:nth-child(1)").text(tdtext5);
    $(trs1[i]).children("td:nth-child(2)").text(tdtext1);
    $(trs2[i]).children("td:nth-child(1)").text(tdtext5);
    $(trs2[i]).children("td:nth-child(2)").text(tdtext2);
    $(trs3[i]).children("td:nth-child(1)").text(tdtext3);
    $(trs3[i]).children("td:nth-child(2)").text(tdtext4 + "%");
  }
}

//根据相差量，从大到小重新排序数据
function difPercentageSort(col){
  var trs1 = $("#accContrastshow-tbone tbody tr");
  var trs2 = $("#accContrastshow-tbtwo tbody tr");
  var trs3 = $("#accContrastshow-three tbody tr");
  var str = "";
  //保存数据成一个表格，进行排序
  for(var i=0;i<trs1.length-1;i++){ //全市数据不做排序
    var tdtext1 = $(trs1[i]).children("td:nth-child(2)").text();
    var tdtext2 = $(trs2[i]).children("td:nth-child(2)").text();
    var tdtext3 = $(trs3[i]).children("td:nth-child(1)").text();
    var tdtext4 = $(trs3[i]).children("td:nth-child(2)").text();
    tdtext4 = tdtext4.substring(0,tdtext4.length-1);
    var tdtext5 = $(trs1[i]).children("td:nth-child(1)").text();
    str += "<tr>"
      + "<td>" + tdtext1 + "</td>"
      + "<td>" + tdtext2 + "</td>"
      + "<td>" + tdtext3 + "</td>"
      + "<td>" + tdtext4 + "</td>"
      + "<td>" + tdtext5 + "</td>"
      + "</tr>";
  }
  $("#SortSubstitutionTable tbody").html(str);  
  sort("num", -1, col); //参数("num"：排序类型;1：排序顺序;col：排序的列)
}

//表格排序方法
function sort(str, flag, n) {
  var tbody = $("#SortSubstitutionTable tbody");
  var trs = $("#SortSubstitutionTable tbody tr");
  if(!isbaDifSortDataTable){
    isbaDifSortDataTable = true;
    baDifSortDataTable = trs;//排序前备份数据
  }
  var arr = [];//备份trs
  for(var i = 0; i < trs.length; i++) {    
    arr.push(trs[i]);  
  };  
  //数组排序
  arr.sort(function(a, b) {    
    return methodType(str, reversalShortNumToLong(a.cells[n].innerHTML), reversalShortNumToLong(b.cells[n].innerHTML)) * flag;  
  });  
  //查看排序情况
//  for(var i = 0; i < arr.length; i++) {    
//    $(tbody).append(arr[i]);  //append：貌似替换了
//  };
  //把排序的行列重新赋值回去
  var trs1 = $("#accContrastshow-tbone tbody tr");
  var trs2 = $("#accContrastshow-tbtwo tbody tr");
  var trs3 = $("#accContrastshow-three tbody tr");
  for(var i=0;i<arr.length;i++){
    var tdtext1 = $(arr[i]).children("td:nth-child(1)").text();
    var tdtext2 = $(arr[i]).children("td:nth-child(2)").text();
    var tdtext3 = $(arr[i]).children("td:nth-child(3)").text();
    var tdtext4 = $(arr[i]).children("td:nth-child(4)").text();
    var tdtext5 = $(arr[i]).children("td:nth-child(5)").text();
    $(trs1[i]).children("td:nth-child(1)").text(tdtext5);
    $(trs1[i]).children("td:nth-child(2)").text(tdtext1);
    $(trs2[i]).children("td:nth-child(1)").text(tdtext5);
    $(trs2[i]).children("td:nth-child(2)").text(tdtext2);
    $(trs3[i]).children("td:nth-child(1)").text(tdtext3);
    $(trs3[i]).children("td:nth-child(2)").text(tdtext4 + "%");
  }
}

//返回比较值（>0 、<0 或=0）
function methodType(str, a, b) {
  switch(str) {  
    case 'num':
       return a - b; //根据返回值（>0 、<0 或=0），使数组排序
      break;  
    case 'string':
       return a.localeCompare(b);    
      break;  
    default:
       return new Date(a.split('-').join('/')).getTime() - new Date(b.split('-').join('/')).getTime();  
      break;  
  }
}

//============================核算对比展示End==============================

//===========================核算面板-统计图Start========================
//统计图--初始化统计图图层变量
var mapStaticsType="";
var themeLayerAcc, infowinAcc, infowinPositionAcc;
var isloadThemeLayerAcc = false; //判断是否添加图层
var accCodomain = [0, 40000];// 允许图表展示的值域范围
var accAxisYLabels = ["4万", "3万", "2万", "1万", "0"]; // y 轴标签--值需要自定义(这里例子)
//以下2个数组的元素数量要一致
var accAxisXLabels = ["04年", "05年", "09年", "10年", "15年"]; // x 轴标签--值需要自定义(这里例子)
var accAttributeList = ["CON2004", "CON2005", "CON2009", "CON2010", "CON2014"]; // 指定用于专题图制作的属性字段--值需要自定义(这里例子)
//具体颜色数量设置根据上面accAxisXLabels，这里备份颜色数组--
var accFillColors = ["#FFB980","#5AB1EF","#B6A2DE","#2EC7C9","#D87A80","#6696FF","#8D66FF","#E266FF","#FF7166","#000066",
  "#0000CC","#0033CC","#006600","#009933","#009966","#0099FF","#00FF00","#33FF99","#00FFFF","#330066","#6600FF","#663366",
  "#669933","#6699FF","#33FF33","#66FFFF","#990033","#9900FF","#663366","#9933FF","#9966FF","#999966","#99CC00","#66FF33",
  "#CC0066","#CC3333","#CC9900","#99CC00","#99FF00","#FF0066","#CC33FF","#CC9999","#FFCC66","#FFFF00"]; 
var accFaceStyleByFields; //json格式，颜色设置，根据颜色数组
var dataList = [
  [22023, 24982, 27760, 30350, 33337],
  [15200, 17852, 20624, 22984, 26261],
  [26582, 32271, 35439, 36893, 39223],
  [8494, 9723, 11832, 13655, 15270],
  [7922, 9121, 10634, 11601, 12978],
  [8538, 9241, 10811, 12276, 13676],
  [10906, 13016, 15635, 17999, 20156],
  [6854, 8447, 9746, 10829, 12078]
]; //模拟查询的数据

//获取radio选中的统计图类型
function getRadioCkType(radioName){
  var val = "";
  var ck = $("input[name='"+radioName+"']:checked");
  var cktext = $(ck).parent().text();
  switch(cktext){
    case "柱状图":
      val = "Bar";
      break;
    case "三维柱状图":
      val = "Bar3D";
      break;
    case "点状图":
      val = "Point";
      break;
    case "折线图":
      val = "Line";
      break;
    case "饼形图":
      val = "Pie";
      break;
    case "环形图":
      val = "Ring";
      break;
    default:
      break;
  }
  return val;
}

//统计图--处理统计图需要的数据--根据选择年份，资源类型，统计图类型
function handleStaticsNeedData(){
  mapStaticsType = "restype"; //资源类型统计
  //useDataChartType = 1;//查询各区县总价值量数据
  useDataAllType = 2;//查询各区县明细数据
  var yearID = $("#select-year option:selected").val();
  var waterTypeID = $("#select-res-value option:selected").val(); //价值类型
  var rangeid = $("#select-area option:selected").val(); //查询全市
  var restypeid = $("#select-resource option:selected").val(); //资源类型
  //数据查询
  switch(Number(restypeid)){
    case 1:
      //土地资源
      //selectDataByLandIn(yearID,waterTypeID);
      findLandValueDataByCondition(yearID,waterTypeID);
      break;
    case 2:
      //水资源
      //selectDataByWaterIn(yearID,waterTypeID);
      findWaterValueDataByCondition(yearID,waterTypeID);
      break;
    case 3:
      //林木资源
      //selectDataByForestIn(yearID,waterTypeID);
      findForestValueDataByCondition(yearID,waterTypeID);
      break;
    case 4:
      //矿产资源
      //selectDataByMineralIn(yearID,waterTypeID);
      findMineValueDataByCondition(yearID,waterTypeID);
      break;
    case 5:
      //可再生能源
      //selectDataByRenewableIn(yearID,waterTypeID);
      findRenewableValueDataByCondition(yearID,waterTypeID);
      break;
    case 6:
      //大气资源
      //selectDataByAirIn(yearID,waterTypeID);
      findAtmosphereValueDataByCondition(yearID,waterTypeID);
      break;
    default:
      break;
  }
}

//统计图--不同类型统计图接口
function createChartByType(type) { //type：统计图类型
  //数据查询完毕，关闭加载面板
  $("#resource-loading").css("display", "none");
//  $("#tab_table").css("display", "none");
//  $("#resource-result").css("display", "block");
  setStaticsData("restype");//处理资源类型统计图需要数据
  createThemeLayerAcc(type); //创建图层
  findAreaFeatures(); //查询区县要素，再根据区县添加图层要素，保存展示数据
}

//资源类型统计--处理查询出来的数据
function setStaticsData(type){
  // 设置 X 轴值
  var backList = [];
  accAxisXLabels = [];//初始化
  accAttributeList = [];//初始化
  dataList = [];//初始化
  for(var i=0;i<publicData.length;i++){
    if(type == "dateover"){ //时间过度统计
      accAxisXLabels.push(publicData[i].yearMC + "年"); //年份作为下标
    }else{
      accAxisXLabels.push(publicData[i].waterFeatures); //价值类型
    }
    backList.push(publicData[i].inventory1); //各区县数据
    backList.push(publicData[i].inventory2);
    backList.push(publicData[i].inventory3);
    backList.push(publicData[i].inventory4);
    backList.push(publicData[i].inventory5);
    backList.push(publicData[i].inventory6);
    backList.push(publicData[i].inventory7);
    backList.push(publicData[i].inventory8);
  }
  accAttributeList = accAxisXLabels; //赋值字段这里直接和X下标相同
  //设置 dataList 数据--行列倒换
  var flength = accAxisXLabels.length; // X 轴数量
  for(var i=0;i<8;i++){ //循环8个区县
    var onelist = [];
    for(var j=i;j<backList.length;j+=8){ //循环价值类型
      var oneval = backList[j];
      onelist.push(oneval);
    }
    dataList.push(onelist);
  }
  //获取最大值~~整数
  var max = getListMaxNum(backList);
  max = getNearNumToUp(max); //首位+1
  //设置范围值
  accCodomain = [0, max]; 
  //设置 Y 轴标签值
  var meanValue = max/4;//平均数
  //分段数
  var overlayCount = 0;
  accAxisYLabels = [0]; //初始化 Y 轴标签值
  for(var i=0;i<4;i++){
    overlayCount += meanValue;
    accAxisYLabels.push(overlayCount);
  }
  //数组排序
  accAxisYLabels.sort(function(a, b) {    
    return 1; //倒序排序
  });  
  accAxisYLabels = transitionListNumToShortMillion(accAxisYLabels);//个转换亿级别
  //颜色设置
  createFillColorArray(flength);//生成颜色设置json
}

//统计图--颜色设置json
function createFillColorArray(flength){
  var str = "[";
  for(var j=0;j<flength;j++){
    var color = accFillColors[j];
    str += "{\"fillColor\":\"" + color + "\"},";
  }
  str = str.substring(0,str.length-1);
  str += "]";
  accFaceStyleByFields = JSON.parse(str);
}

//统计图--创建专题图图层
function createThemeLayerAcc(type) {
  removeThemeLayerAcc();//有图层先移除图层，重新实例化图层  
  themeLayerAcc = new SuperMap.Layer.Graph("ThemeLayer", type);
  // 指定用于专题图制作的属性字段
  themeLayerAcc.themeFields = accAttributeList;
  // 配置图表参数
  if(type == "Bar" || type == "Bar3D") {
    // 配置图表参数
    themeLayerAcc.chartsSetting = {
      // width，height，codomain 分别表示图表宽、高、数据值域；此三项参数为必设参数
      width: 260,
      height: 120,
      codomain: accCodomain, // 允许图表展示的值域范围，此范围外的数据将不制作图表
      // 3d 柱条正面样式（3d 柱条的侧面和顶面会以 3d 柱条正面样式为默认样式）
      barFaceStyle: {
        stroke: true
      },
      // 按字段设置 3d 柱条正面样式
      barFaceStyleByFields: accFaceStyleByFields,
      // 3d 柱条正面 hover 样式（3d 柱条的侧面和顶面 hover 会以 3d 柱条正面 hover 样式为默认 hover 样式）
      barFaceHoverStyle: {
        stroke: true,
        strokeWidth: 1,
        strokeColor: "#ffff00"
      },
      xShapeBlank: [15, 15, 15], // 水平方向上的空白间距参数
      axisYTick: 4, // y 轴刻度数量
      useXReferenceLine: true, // 使用参考线
      xReferenceLineStyle: {
        strokeColor: "#008acd",
        strokeOpacity: 0.4
      }, // 参考线样式
      axisYLabels: accAxisYLabels,
      axisXLabels: accAxisXLabels,
      backgroundStyle: { // 背景样式
        fillColor: "#d1eeee",
        shadowBlur: 12,
        shadowColor: "#d1eeee"
      },
      backgroundRadius: [5, 5, 5, 5] // 背景框圆角参数
    };
  } else if(type == "Point" || type == "Line") {
    themeLayerAcc.chartsSetting = {
      width: 220,
      height: 100,
      codomain: accCodomain,
      xShapeBlank: [10, 10],
      axisYTick: 4,
      axisYLabels: accAxisYLabels,
      axisXLabels: accAxisXLabels,
      backgroundStyle: {
        fillColor: "#d1eeee"
      },
      backgroundRadius: [5, 5, 5, 5],
      useXReferenceLine: true,
      pointStyle: {
        pointRadius: 5,
        shadowBlur: 12,
        shadowColor: "#D8361B",
        fillOpacity: 0.8
      },
      pointHoverStyle: {
        stroke: true,
        strokeColor: "#D8361B",
        strokeWidth: 2,
        fillColor: "#ffffff",
        pointRadius: 4
      }
    }
  } else if(type == "Pie" || type == "Ring") {
    themeLayerAcc.chartsSetting = {
      // width，height，codomain 分别表示图表宽、高、数据值域；此三项参数为必设参数
      width: 100,
      height: 100,
      codomain: accCodomain, // 允许图表展示的值域范围，此范围外的数据将不制作图表
      innerRingRadius: 20, // 环状图内环半径，默认值：0，innerRingRadius 为 0 时，可视效果同饼图
      // 饼图扇形（表示字段值的图形）样式
      sectorStyle: {
        fillOpacity: 0.9
      },
      // 按字段设置饼图扇形 (样式与 themeLayerAcc.themeFields 数组中的字段名称一一对应)
      sectorStyleByFields: accFaceStyleByFields,
      //  饼图扇形 hover 样式
      sectorHoverStyle: {
        fillOpacity: 1
      }
    };
  }
  themeLayerAcc.setOpacity(0.9);
  // 注册专题图 mousemove, mouseout事件(注意：专题图图层对象自带 on 函数，没有 events 对象)
  themeLayerAcc.on("mousemove", showInfoWinAcc);
  themeLayerAcc.on("mouseout", closeInfoWinAcc);
  // 注册地图 mousemove，用于获取当前鼠标在地图中的像素位置
  map.events.on({
    "mousemove": function(e) {
      infowinPositionAcc = e.xy.clone();
      // 偏移
      infowinPositionAcc.x += 40;
      infowinPositionAcc.y -= 25;
    }
  });
  if(!isloadThemeLayerAcc){
    isloadThemeLayerAcc = true;
    map.addLayer(themeLayerAcc);
  }
}

//统计图--根据数组字符串长度转成统计图长度
function getStaticcsLengthByString(list){
  var str = list + "";//数组转字符串
  var strlength = str.length;
  return strlength*10; //一个字符10个像素
}

//统计图--查询区县要素
function findAreaFeatures(){
  var getFeatureParam, getFeatureBySQLService, getFeatureBySQLParams;
  getFeatureParam = new SuperMap.REST.FilterParameter({
    name: "区县界_region",
    attributeFilter: "SMID > -1"
  });
  getFeatureBySQLParams = new SuperMap.REST.GetFeaturesBySQLParameters({
    queryParameter: getFeatureParam,
    toIndex: 500,
    datasetNames: ["meizhoumap:区县界_region"]
  });
  getFeatureBySQLService = new SuperMap.REST.GetFeaturesBySQLService(urlData, {
    eventListeners: {
      "processCompleted": processCompletedStatics,
      "processFailed": processFailed
    }
  });
  getFeatureBySQLService.processAsync(getFeatureBySQLParams);
}
    
//统计图--查询成功
var attStartIndex = 0; //超过5个X坐标的选择展示开始index
function processCompletedStatics(getFeaturesEventArgs){
  var features = [];
  var resultFeatures = getFeaturesEventArgs.result.features;
  for(var i = 0, len = resultFeatures.length; i < len; i++) {
    // 要素~~~
    var feature = resultFeatures[i];
    var centroid = feature.geometry.getCentroid(); //获取geometry质心
    // 获取要素中心点，实例化Point要素
    var geo = new SuperMap.Geometry.Point(centroid.x, centroid.y);
    var attrs = new Array();//集合！！！
    attrs["NAME"]= feature.attributes.NAME; //根据NAME对应赋值相应的数据
    //循环获取要展示的字段--注意! 业务数据库 区县字段顺序 和 地图数据库 区县顺序不一致，要对应区县名称赋值
    //注意2：超出5个X坐标的可能不显示或难看，另左处理，分批选择展示
    for(var j=attStartIndex;j<accAttributeList.length;j++){
      var attr = accAttributeList[j]; //X坐标分类
      //根据NAME对应赋值相应的数据
      var areaIndex = getFindDataByAreaName(feature.attributes.NAME); //获取区县index
      attrs[attr]= dataList[areaIndex][j]; //根据X坐标分类赋值相应数据
    }
    var fea = new SuperMap.Feature.Vector(geo,attrs);//attrs：Array集合
    features.push(fea);
  }
  themeLayerAcc.addFeatures(features);
  //staticsResultAnalysis();//结果分析
}

//根据feature区县NAME对应获取对应在业务数据库的区县index
function getFindDataByAreaName(name){
  for(var i=0;i<saveArea.length;i++){
    var saveMC = "";
    saveMC = saveArea[i].areaMC.trim();
    name = name.trim(); //去空格
    if(name == saveMC){
      return i;
    }
  }
  return 0;
}

//统计图--显示地图弹窗
function showInfoWinAcc(e) {
  // e.target 是图形对象，即数据的可视化对象，饼状图中是扇形。
  // 图形对象的 refDataID 属性是数据（feature）的 id 属性，它指明图形对象是由那个数据制作而来;
  // 图形对象的 dataInfo 属性是图形对象表示的具体数据，他有两个属性，field 和 value;
  if(e.target && e.target.refDataID && e.target.dataInfo) {
    closeInfoWinAcc();
    // 获取图形对应的数据 (feature)
    var fea = themeLayerAcc.getFeatureById(e.target.refDataID);
    var info = e.target.dataInfo;
    // 弹窗内容
    var contentHTML = "<div style='color: #000; background-color: #fff'>";
    contentHTML += "区县名称:<br><strong>" + fea.attributes.NAME + "</strong>";
    contentHTML += "<hr style='margin: 3px'>";
    contentHTML += createHtmlByField(info);//通过名称查找对应值,转换html
    contentHTML += "</div>";
    // 弹出框大小
    var infowinSize = (SuperMap.Browser.name == "firefox") ? new SuperMap.Size(210, 110) : new SuperMap.Size(200, 100);
    // 弹出窗地理位置
    var lonLat = map.getLonLatFromPixel(infowinPositionAcc);
    infowinAcc = new SuperMap.Popup("infowinAcc", lonLat, infowinSize, contentHTML, false, false, null);
    infowinAcc.setBackgroundColor("#fff");
    infowinAcc.setOpacity(0.9);
    if(infowinAcc) map.removePopup(infowinAcc);
    map.addPopup(infowinAcc);
  }
}

//通过名称查找对应值,转换html
function createHtmlByField(info){
  var field = info.field;
  for(var i=0;i<accAttributeList.length;i++){
    var attribute = accAttributeList[i];
    if(field == attribute){
      var str = "";
      if(mapStaticsType == "dateover"){
        var mxtext = $("#select-res-detail-date option:selected").text();
        str = accAxisXLabels[i] + "<strong>" + mxtext + "</strong>资源价值量(元)" + " <br/><strong>" + transitionNumToShortMillion(info.value,5) + "</strong>";
      }else{
        str = "<strong>" +accAxisXLabels[i] + "</strong>资源价值量(元)" + " <br/><strong>" + transitionNumToShortMillion(info.value,5) + "</strong>";
      }
      return str; //返回str
    }
  }
  return "No Data"; //没有数据返回
}

//统计图--移除统计图层
function removeThemeLayerAcc(){
  if(themeLayerAcc && isloadThemeLayerAcc){
    isloadThemeLayerAcc = false;
    clearThemeLayerAcc();
    map.removeLayer(themeLayerAcc);
  }
}

//统计图--清除统计图图层中的内容
function clearThemeLayerAcc() {
  if(themeLayerAcc) {
    themeLayerAcc.clear();
    closeInfoWinAcc();
  }
}

//统计图--销毁地图弹窗
function closeInfoWinAcc() {
  if(infowinAcc) {
    try {
      map.removePopup(infowinAcc);
    } catch(e) {
      alert(e.message);
    }
  }
}

//统计图--结果分析
function staticsResultAnalysis(){
  if(mapStaticsType == "dateover"){
    var ck = $("input[name='ra-chart-type-date']:checked");
    var cktext = $(ck).parent().text();
    $("#tb-statics-result-date tr:nth-child(6)").children("td:nth-child(2)").text(cktext); //统计图类型
    var mxtext = $("#select-res-detail-date option:selected").text();
    $("#tb-statics-result-date tr:nth-child(5)").children("td:nth-child(1)").text("明细类型"); //明细类型
    $("#tb-statics-result-date tr:nth-child(5)").children("td:nth-child(2)").text(mxtext); //明细类型
    var restype = $("#select-resource-date option:selected").text();
    $("#tb-statics-result-date tr:nth-child(3)").children("td:nth-child(2)").text(restype); //资源类型
    var valuetype = $("#select-res-value-date option:selected").text();
    $("#tb-statics-result-date tr:nth-child(4)").children("td:nth-child(2)").text(valuetype); //价值类型
    $("#tb-statics-result-date tr:nth-child(7)").children("td:nth-child(1)").text("结果分析(各区县"+mxtext+"价值量)"); //
    for(var i=0;i<dataList.length;i++){
      var sonlist = dataList[i];
      var maxIndex = getListMaxIndex(sonlist);
      var maxRes = accAxisXLabels[maxIndex];
      $("#tb-statics-result-date tr:nth-child("+(i+8)+")").children("td:nth-child(1)").text(saveArea[i].areaMC + "："); //对应区县名称
      $("#tb-statics-result-date tr:nth-child("+(i+8)+")").children("td:nth-child(2)").text(maxRes + mxtext +"价值量最高"); //对应区县最优势资源
    }
  }else{
    var ck = $("input[name='ra-chart-type']:checked");
    var cktext = $(ck).parent().text();
    $("#tb-statics-result tr:nth-child(6)").children("td:nth-child(2)").text(cktext); //统计图类型
    var year = $("#select-year option:selected").text();
    $("#tb-statics-result tr:nth-child(5)").children("td:nth-child(1)").text("查询年份"); //年份
    $("#tb-statics-result tr:nth-child(5)").children("td:nth-child(2)").text(year); //年份
    var restype = $("#select-resource option:selected").text();
    $("#tb-statics-result tr:nth-child(3)").children("td:nth-child(2)").text(restype); //资源类型
    var valuetype = $("#select-res-value option:selected").text();
    $("#tb-statics-result tr:nth-child(4)").children("td:nth-child(2)").text(valuetype); //价值类型
    for(var i=0;i<dataList.length;i++){
      var sonlist = dataList[i];
      var maxIndex = getListMaxIndex(sonlist);
      var maxRes = accAxisXLabels[maxIndex];
      $("#tb-statics-result tr:nth-child("+(i+8)+")").children("td:nth-child(1)").text(saveArea[i].areaMC + "："); //对应区县名称
      $("#tb-statics-result tr:nth-child("+(i+8)+")").children("td:nth-child(2)").text(maxRes + " 资源价值量最高"); //对应区县最优势资源
    }
  }
}

//获取数组最大值的index
function getListMaxIndex(list){
  var max = 0, maxIndex;
  for(var i=0;i<list.length;i++){
    var num = list[i];
    if(max < num){
      max = num;
      maxIndex = i;
    }
  }
  return maxIndex;
}

//--------------------时间过度统计Start----------------------
//时间过度统计--查询明细类型-绑定下拉框--水资源
function bindDateOverSelectWater(waterTypeID){
  $.ajax({
    url:pathbase+'/waterTypeandFeaturesTable/findWaterMxDateSelectByCondition.do',
    type:'POST', //GET
    async:true, //true或false,是否异步,异步：true
    data:{ waterTypeID:waterTypeID }, //传递参数 
    timeout:5000,    //超时时间
    dataType:'json',    //返回的数据格式：json/xml/html/script/jsonp/text
    success:function(data,textStatus,jqXHR){
      var str = "";
      if(data.length > 0){
        for(var i = 0; i < data.length;i++){
          str += "<option value=" + data[i].waterTypeAndFeaturesID + ">" + data[i].waterFeatures + "</option>";
        }
      }else{
        tipMapStaticsNoDataAutoHide("该价值类型暂无明细类型");
      }
      $("#select-res-detail-date").html(str);
    },
    error:function(xhr,textStatus){
      console.log('bindDateOverSelectWater()错误');
      loadFailMsg(textStatus);
    }
  });
}

//时间过度统计--查询明细类型-绑定下拉框--土地资源
function bindDateOverSelectLand(waterTypeID){
  $.ajax({
    url:pathbase+'/waterTypeandFeaturesTable/findLandMxDateSelectByCondition.do',
    type:'POST', //GET
    async:true, //true或false,是否异步,异步：true
    data:{ waterTypeID:waterTypeID }, //传递参数 
    timeout:5000,    //超时时间
    dataType:'json',    //返回的数据格式：json/xml/html/script/jsonp/text
    success:function(data,textStatus,jqXHR){
      var str = "";
      if(data.length > 0){
        for(var i = 0; i < data.length;i++){
          str += "<option value=" + data[i].waterTypeAndFeaturesID + ">" + data[i].waterFeatures + "</option>";
        }
      }else{
        tipMapStaticsNoDataAutoHide("该价值类型暂无明细类型");
      }
      $("#select-res-detail-date").html(str);
    },
    error:function(xhr,textStatus){
      console.log('bindDateOverSelectLand()错误');
    }
  });
}

//时间过度统计--查询明细类型-绑定下拉框--林木资源
function bindDateOverSelectForest(waterTypeID){
  $.ajax({
    url:pathbase+'/waterTypeandFeaturesTable/findForestMxDateSelectByCondition.do',
    type:'POST', //GET
    async:true, //true或false,是否异步,异步：true
    data:{ waterTypeID:waterTypeID }, //传递参数 
    timeout:5000,    //超时时间
    dataType:'json',    //返回的数据格式：json/xml/html/script/jsonp/text
    success:function(data,textStatus,jqXHR){
      var str = "";
      if(data.length > 0){
        for(var i = 0; i < data.length;i++){
          str += "<option value=" + data[i].waterTypeAndFeaturesID + ">" + data[i].waterFeatures + "</option>";
        }
      }else{
        tipMapStaticsNoDataAutoHide("该价值类型暂无明细类型");
      }
      $("#select-res-detail-date").html(str);
    },
    error:function(xhr,textStatus){
      console.log('bindDateOverSelectForest()错误');
    }
  });
}

//时间过度统计--查询明细类型-绑定下拉框--矿产资源
function bindDateOverSelectMine(waterTypeID){
  $.ajax({
    url:pathbase+'/waterTypeandFeaturesTable/findMineMxDateSelectByCondition.do',
    type:'POST', //GET
    async:true, //true或false,是否异步,异步：true
    data:{ waterTypeID:waterTypeID }, //传递参数 
    timeout:5000,    //超时时间
    dataType:'json',    //返回的数据格式：json/xml/html/script/jsonp/text
    success:function(data,textStatus,jqXHR){
      var str = "";
      if(data.length > 0){
        for(var i = 0; i < data.length;i++){
          str += "<option value=" + data[i].waterTypeAndFeaturesID + ">" + data[i].waterFeatures + "</option>";
        }
      }else{
        tipMapStaticsNoDataAutoHide("该价值类型暂无明细类型");
      }
      $("#select-res-detail-date").html(str);
    },
    error:function(xhr,textStatus){
      console.log('bindDateOverSelectMine()错误');
    }
  });
}

//时间过度统计--查询明细类型-绑定下拉框--可再生能源
function bindDateOverSelectRenewable(waterTypeID){
  $.ajax({
    url:pathbase+'/waterTypeandFeaturesTable/findRenewableMxDateSelectByCondition.do',
    type:'POST', //GET
    async:true, //true或false,是否异步,异步：true
    data:{ waterTypeID:waterTypeID }, //传递参数 
    timeout:5000,    //超时时间
    dataType:'json',    //返回的数据格式：json/xml/html/script/jsonp/text
    success:function(data,textStatus,jqXHR){
      var str = "";
      if(data.length > 0){
        for(var i = 0; i < data.length;i++){
          str += "<option value=" + data[i].waterTypeAndFeaturesID + ">" + data[i].waterFeatures + "</option>";
        }
      }else{
        tipMapStaticsNoDataAutoHide("该价值类型暂无明细类型");
      }
      $("#select-res-detail-date").html(str);
    },
    error:function(xhr,textStatus){
      console.log('bindDateOverSelectRenewable()错误');
    }
  });
}

//时间过度统计--查询明细类型-绑定下拉框--大气资源
function bindDateOverSelectAtmosphere(waterTypeID){
  $.ajax({
    url:pathbase+'/waterTypeandFeaturesTable/findAtmosphereMxDateSelectByCondition.do',
    type:'POST', //GET
    async:true, //true或false,是否异步,异步：true
    data:{ waterTypeID:waterTypeID }, //传递参数 
    timeout:5000,    //超时时间
    dataType:'json',    //返回的数据格式：json/xml/html/script/jsonp/text
    success:function(data,textStatus,jqXHR){
      var str = "";
      if(data.length > 0){
        for(var i = 0; i < data.length;i++){
          str += "<option value=" + data[i].waterTypeAndFeaturesID + ">" + data[i].waterFeatures + "</option>";
        }
      }else{
        tipMapStaticsNoDataAutoHide("该价值类型暂无明细类型");
      }
      $("#select-res-detail-date").html(str);
    },
    error:function(xhr,textStatus){
      console.log('bindDateOverSelectAtmosphere()错误');
    }
  });
}

//时间过度统计--查询明细类型数据--水资源
function selectDateOverDataWater(waterFeatures){
  $.ajax({
    url:pathbase+'/waterTypeandFeaturesTable/findWaterMxDateDataByCondition.do',
    type:'POST', //GET
    async:true, //true或false,是否异步,异步：true
    data:{ waterFeatures:waterFeatures }, //传递参数 
    timeout:5000,    //超时时间
    dataType:'json',    //返回的数据格式：json/xml/html/script/jsonp/text
    success:function(data,textStatus,jqXHR){
      var str = "";
      if(data.length > 0){
        publicData = data;
        var type = getRadioCkType("ra-chart-type-date");
        createChartByTypeByDate(type); //统计图
      }else{
        tipMapStaticsNoData("暂无数据，请选择其他条件查看!");//提示无数据
        accountingResReturnByDate();
      }
    },
    error:function(xhr,textStatus){
      console.log('selectDateOverDataWater()错误');
    }
  });
}

//时间过度统计--查询明细类型数据--土地资源
function selectDateOverDataLand(waterFeatures){
  $.ajax({
    url:pathbase+'/waterTypeandFeaturesTable/findLandMxDateDataByCondition.do',
    type:'POST', //GET
    async:true, //true或false,是否异步,异步：true
    data:{ waterFeatures:waterFeatures }, //传递参数 
    timeout:5000,    //超时时间
    dataType:'json',    //返回的数据格式：json/xml/html/script/jsonp/text
    success:function(data,textStatus,jqXHR){
      var str = "";
      if(data.length > 0){
        publicData = data;
        var type = getRadioCkType("ra-chart-type-date");
        createChartByTypeByDate(type); //统计图
      }else{
        tipMapStaticsNoData("暂无数据，请选择其他条件查看!");//提示无数据
        accountingResReturnByDate();
      }
    },
    error:function(xhr,textStatus){
      console.log('selectDateOverDataLand()错误');
    }
  });
}

//时间过度类型统计--查询明细类型数据--林木资源
function selectDateOverDataForest(waterFeatures){
  $.ajax({
    url:pathbase+'/waterTypeandFeaturesTable/findForestMxDateDataByCondition.do',
    type:'POST', //GET
    async:true, //true或false,是否异步,异步：true
    data:{ waterFeatures:waterFeatures }, //传递参数 
    timeout:5000,    //超时时间
    dataType:'json',    //返回的数据格式：json/xml/html/script/jsonp/text
    success:function(data,textStatus,jqXHR){
      var str = "";
      if(data.length > 0){
        publicData = data;
        var type = getRadioCkType("ra-chart-type-date");
        createChartByTypeByDate(type); //统计图
      }else{
        tipMapStaticsNoData("暂无数据，请选择其他条件查看!");//提示无数据
        accountingResReturnByDate();
      }
    },
    error:function(xhr,textStatus){
      console.log('selectDateOverDataForest()错误');
    }
  });
}

//时间过度统计--查询明细类型数据--矿产资源
function selectDateOverDataMine(waterFeatures){
  $.ajax({
    url:pathbase+'/waterTypeandFeaturesTable/findMineMxDateDataByCondition.do',
    type:'POST', //GET
    async:true, //true或false,是否异步,异步：true
    data:{ waterFeatures:waterFeatures }, //传递参数 
    timeout:5000,    //超时时间
    dataType:'json',    //返回的数据格式：json/xml/html/script/jsonp/text
    success:function(data,textStatus,jqXHR){
      var str = "";
      if(data.length > 0){
        publicData = data;
        var type = getRadioCkType("ra-chart-type-date");
        createChartByTypeByDate(type); //统计图
      }else{
        tipMapStaticsNoData("暂无数据，请选择其他条件查看!");//提示无数据
        accountingResReturnByDate();
      }
    },
    error:function(xhr,textStatus){
      console.log('selectDateOverDataMine()错误');
    }
  });
}

//时间过度统计--查询明细类型数据--可再生能源
function selectDateOverDataRenewable(waterFeatures){
  $.ajax({
    url:pathbase+'/waterTypeandFeaturesTable/findRenewableMxDateDataByCondition.do',
    type:'POST', //GET
    async:true, //true或false,是否异步,异步：true
    data:{ waterFeatures:waterFeatures }, //传递参数 
    timeout:5000,    //超时时间
    dataType:'json',    //返回的数据格式：json/xml/html/script/jsonp/text
    success:function(data,textStatus,jqXHR){
      var str = "";
      if(data.length > 0){
        publicData = data;
        var type = getRadioCkType("ra-chart-type-date");
        createChartByTypeByDate(type); //统计图
      }else{
        tipMapStaticsNoData("暂无数据，请选择其他条件查看!");//提示无数据
        accountingResReturnByDate();
      }
    },
    error:function(xhr,textStatus){
      console.log('selectDateOverDataRenewable()错误');
    }
  });
}

//时间过统计--查询明细类型数据--大气资源
function selectDateOverDataAtmosphere(waterFeatures){
  $.ajax({
    url:pathbase+'/waterTypeandFeaturesTable/findAtmosphereMxDateDataByCondition.do',
    type:'POST', //GET
    async:true, //true或false,是否异步,异步：true
    data:{ waterFeatures:waterFeatures }, //传递参数 
    timeout:5000,    //超时时间
    dataType:'json',    //返回的数据格式：json/xml/html/script/jsonp/text
    success:function(data,textStatus,jqXHR){
      var str = "";
      if(data.length > 0){
        publicData = data;
        var type = getRadioCkType("ra-chart-type-date");
        createChartByTypeByDate(type); //统计图
      }else{
        tipMapStaticsNoData("暂无数据，请选择其他条件查看!");//提示无数据
        accountingResReturnByDate();
      }
    },
    error:function(xhr,textStatus){
      console.log('selectDateOverDataAtmosphere()错误');
    }
  });
}

//时间过度统计--处理统计图需要数据-
function handleStaticsNeedDataByDate(){
  mapStaticsType = "dateover"; //时间过度统计
  var waterFeatures = $("#select-res-detail-date option:selected").text(); //价值类型
  var restypeid = $("#select-resource-date option:selected").val(); //资源类型
  //数据查询
  switch(Number(restypeid)){
    case 1:
      //土地资源
      selectDateOverDataLand(waterFeatures);
      break;
    case 2:
      //水资源
      selectDateOverDataWater(waterFeatures);
      break;
    case 3:
      //林木资源
      selectDateOverDataForest(waterFeatures);
      break;
    case 4:
      //矿产资源
      selectDateOverDataMine(waterFeatures);
      break;
    case 5:
      //可再生能源
      selectDateOverDataRenewable(waterFeatures);
      break;
    case 6:
      //大气资源
      selectDateOverDataAtmosphere(waterFeatures);
      break;
    default:
      break;
  }
}

//时间过度统计--不同类型统计图接口
function createChartByTypeByDate(type){
  //数据查询完毕，关闭加载面板
  $("#resource-loading").css("display", "none");
//  $("#tab_table_date").css("display", "none");
//  $("#resource-result-date").css("display", "block");
  setStaticsData("dateover");//处理统计图需要数据
  createThemeLayerAcc(type); //创建图层
  findAreaFeatures(); //查询区县要素，再根据区县添加图层要素，保存展示数据
}

//--------------------时间过度统计End----------------------

//===========================核算面板-统计图End========================

//========================分析面板-专题图Start========================
//生成专题图接口~~~查询数据库数据~~~生成对应专题图
//参数（restypeid：资源类型；waterTypeID：价值类型；speid：专题图类型）
function specialThemeSelect(restypeid,yearID,waterTypeID){
  useDataChartType = 2;//专题图查询数据
  //根据选择资源类型生成对应样式专题图
  switch(Number(restypeid)){
    case 1:
      //查询土地接口
      selectDataByLandIn(yearID,waterTypeID); //speid：统计图类型;0：查询所有年份,valueid:价值类型
      break;
    case 2:
      //查询水接口
      selectDataByWaterIn(yearID,waterTypeID);
      break;
    case 3:
      //查询林木接口
      selectDataByForestIn(yearID,waterTypeID);
      break;
    case 4:
      //查询矿产接口
      selectDataByMineralIn(yearID,waterTypeID);
      break;
    case 5:
      //查询可再生能源接口
      selectDataByRenewableIn(yearID,waterTypeID);
      break;
    case 6:
      //查询大气接口
      selectDataByAirIn(yearID,waterTypeID);
      break;
    default:
      break;
  }
}

//生成专题图--根据选择专题图类型生成对应专题图
function createSelectTypeSpeLayer(speid){
  var colorType = 0;//颜色选择
  closeAnalyzeResSpecial();//先清空所有专题图
  isdblckick = true;//关闭移动弹出统计图
  isMapMoving = true; //关闭移动高亮区县
  switch(Number(speid)){
    case 1:
      //生成密度专题图
      createThemeLayerDensity();
      break;
    case 2:
      //生成等级专题图
      createThemeLayerRank();
      break;
    case 3:
      //生成分段专题图
      subsectionThematicDataBySelect(dataList);//需要先设置分段数组，设置分段颜色等等
      createThemeLayerSub();
      break;
    case 3:
      //单值专题图
      break;
    default:
      break;
  }
}

//专题图--查询地图区县features-
function addThemeLayerSub() { 
  var getFeatureParam, getFeatureBySQLService, getFeatureBySQLParams;
  getFeatureParam = new SuperMap.REST.FilterParameter({
    name: "区县界_region",
    attributeFilter: "SMID > -1"
  });
  getFeatureBySQLParams = new SuperMap.REST.GetFeaturesBySQLParameters({
    queryParameter: getFeatureParam,
    toIndex: 500,
    datasetNames: ["meizhoumap:区县界_region"]
  });
  getFeatureBySQLService = new SuperMap.REST.GetFeaturesBySQLService(urlData, {
    eventListeners: {
      "processCompleted": processCompletedSub,
      "processFailed": processFailed
    }
  });
  getFeatureBySQLService.processAsync(getFeatureBySQLParams);
}

//专题图--查询地图区县features--查询成功
function processCompletedSub(getFeaturesEventArgs) {
  var speid = $('#an-select-spe option:selected').val();//专题图类型类型
  if(speid == 1){
    addDensityThemeFeatures(getFeaturesEventArgs);//密度专题图
  }else if(speid == 2){
    addRankThemeFeatures(getFeaturesEventArgs);//等级专题图
  }else if(speid == 3){
    addSubThemeLayer(getFeaturesEventArgs);//分段专题图
  }else if(speid == 4){//单值专题图
    
  } 
}

//---------------密度专题图Start---------------
var vectorLayerDensity,makerLayerDensity, isAddMakerLayerDensity = false;
//密度专题图-创建密度专题图图层
function createThemeLayerDensity(){
  if(!isAddMakerLayerDensity){
    isAddMakerLayerDensity = true;
    vectorLayerDensity = new SuperMap.Layer.Vector("vectorLayerDensity");
    makerLayerDensity = new SuperMap.Layer.Markers("makerLayerDensity");
    map.addLayer(vectorLayerDensity);
    map.addLayer(makerLayerDensity);
  }
  addThemeLayerSub();//查询区县
}

//密度专题图-添加区县feature--
function addDensityThemeFeatures(getFeaturesEventArgs){
  clearDensityMarkers();
  var max = getListMaxNum(dataList);//获取最大值
  var meanvalue = max/100;//最大100个密度maker
  var features = [], labelFeatures = [];
  var resultFeatures = getFeaturesEventArgs.result.features;
  for(var i = 0, len = resultFeatures.length; i < len; i++) {
    // 要素
    var feature = resultFeatures[i];
    feature.style = {
      strokeColor : 'Orange',// 边颜色
      strokeWidth : 1,// 边宽度
      strokeDashstyle : 'solid',// 边类型，虚线
      fillColor : accFillColors[i],// 填充颜色
      fillOpacity : 0.1,// 透明度
      label : feature.data.Name,
      fontColor : 'Orange',
      fontSize : '14px',
      fontWeight : 700
    }
    var areaIndex = getFindDataByAreaName(feature.attributes.NAME); //获取区县index
    var data = dataList[areaIndex];
    dotdensity = data/meanvalue; //除以meanvalue得到密度maker数量100以内
    feature.attributes.RES_dotdensity = dotdensity;//密度数量保存
    features.push(feature);
  }
  vectorLayerDensity.addFeatures(features);
  addDensityMarkers();//添加密度maker
}

//密度专题图-根据比例-数量，动态随机不重复有间距位置添加marker
function addDensityMarkers(){
  var features = vectorLayerDensity.features;
  for(var i=0;i<features.length;i++){
    var feature = features[i];
    var dotdensity = feature.attributes.RES_dotdensity; //得到该区域的密度数量
    //创建所有maker坐标
    var posList = createDotdensityPostion(dotdensity,feature);//
    //生成密度maker
    var size = new SuperMap.Size(8,8); 
    var offset = new SuperMap.Pixel(0, 0); 
    var icon = new SuperMap.Icon(pathweb+'/content/images/accounting/rectMarker.png', size, offset); 
    //在该区县feature内循环生成maker--模拟密度专题图
    for(var j=0;j<dotdensity;j++){
      //根据区县feature范围，生成maker--符合范围，不重复，有间距
      var x = posList[j].x; //点坐标位置
      var y = posList[j].y;
      makerLayerDensity.addMarker(new SuperMap.Marker(new SuperMap.LonLat(x,y),icon));
    }
  }
}

//密度专题图-创建一个区县所有密度maker坐标
function createDotdensityPostion(dotdensity,feature){
  var dotlist = [],randomList = [];//保存点数组
  var bound = feature.geometry.bounds; //要获取点的范围
  var top = bound.top;
  var bottom = bound.bottom;
  var left = bound.left;
  var right = bound.right;
  var distanceX = right - left;//获取要获取点的总经度-x
  var distanceY = top - bottom;//获取要获取点的总纬度-y
  var solitaryX = distanceX/dotdensity;//设置点与点的距离
  var solitaryY = distanceY/dotdensity;//设置点与点的距离
  for (var i = 0; i < dotdensity; i++) {//循环生成点数量
    left += solitaryX;
    bottom += solitaryY;
    dotlist.push({ x: left, y: bottom });//添加到数组
  }
  return dotlist;
}

//密度专题图-移除图层
function removeDensityLayer(){
  if(makerLayerDensity && isAddMakerLayerDensity == true){
    isAddMakerLayerDensity = false;
    clearDensityMarkers();
    map.removeLayer(makerLayerDensity);
    map.removeLayer(vectorLayerDensity);
  }
}

//密度专题图-移除makers
function clearDensityMarkers(){
  if(makerLayerDensity){
    makerLayerDensity.clearMarkers();
    vectorLayerDensity.removeAllFeatures();
  }
}

//---------------密度专题图End---------------

//---------------等级专题图Start---------------
//允许图形展示的值域范围，此范围外的数据将不制作图图形，这里例子，动态生成
var rankThemeRange = [0, 40000]; 
var themeLayerRank, infowinRank, infowinPositionRank;
//等级专题图图层--生成专题图---
var isAddLayerRank = false;
function createThemeLayerRank(){
  rankThemeRange = getRankThemeRange();//获取rankThemeRange范围
  removeThemeLayerRank();//清除图层
  // 创建一个圆形符号专题图层
  themeLayerRank = new SuperMap.Layer.RankSymbol("RankSymbolLayer", "Circle");
  //新建一个策略并使用在矢量要素图层(vector)上。 
  var strategy = new SuperMap.Strategy.GeoText(); 
  strategy.style = { 
    fontColor:"#FF7F00", 
    fontWeight:"bolder", 
    fontSize:"14px", 
    fill: true, 
    fillColor: "#FFFFFF", 
    fillOpacity: 1, 
    stroke: true, 
    strokeColor:"#8B7B8B" 
  }; 
  labelLayerSub = new SuperMap.Layer.Vector("labelLayerSub", {strategies: [strategy]}); 
  // 指定用于专题图制作的属性字段  详看下面 addThemeLayer（）中的feature.attrs.RES_dotdensity
  themeLayerRank.themeField = "RES_dotdensity";
  // 配置图表参数
  themeLayerRank.symbolSetting = {
    //必设参数
    codomain: rankThemeRange, // 允许图形展示的值域范围，此范围外的数据将不制作图图形
    //圆最大半径 默认100
    maxR: 50,
    //圆最小半径 默认0
    minR: 3,
    // 圆形样式
    circleStyle: {
      fillOpacity: 0.7
    },
    // 符号专题图填充颜色
    fillColor: "#FFA500",
    // 专题图hover 样式
    circleHoverStyle: {
      fillOpacity: 1
    }
  };
  // 注册专题图 mousemove, mouseout事件(注意：专题图图层对象自带 on 函数，没有 events 对象)
  themeLayerRank.on("mousemove", showInfoWinRank);
  themeLayerRank.on("mouseout", closeInfoWinRank);
  // 注册地图 mousemove，用于获取当前鼠标在地图中的像素位置
  map.events.on({
    "mousemove": function(e) {
      infowinPositionRank = e.xy.clone();
    }
  });
  if(!isAddLayerRank){
    isAddLayerRank = true;
    map.addLayer(labelLayerSub);
    map.addLayer(themeLayerRank);
  }
  addThemeLayerSub();//添加features要素
}

//等级专题图图层--构建 feature 数据, 专题图的数据必须是 SuperMap.Feature.Vector
function addRankThemeFeatures(getFeaturesEventArgs) {
  clearThemeLayerRank();
  var features = [], labelFeatures = [];
  var resultFeatures = getFeaturesEventArgs.result.features;
  for(var i = 0, len = resultFeatures.length; i < len; i++) {
    // 要素
    var feature = resultFeatures[i];
    var style = {
      strokeColor : 'Orange',// 边颜色
      strokeWidth : 0,// 边宽度
      strokeDashstyle : 'solid',// 边类型，虚线
      fillColor : 'Orange',// 填充颜色
      fillOpacity : 0,// 透明度
      label : feature.attributes.NAME,
      fontColor : 'Orange',
      fontOpacity : 1,
      fontSize : '14px',
      fontWeight : 700
    };
    var geometry = feature.geometry;
    var attributes = feature.attributes;
    var pointFeature = new SuperMap.Feature.Vector(geometry,attributes,style); 
    var centroid = feature.geometry.getCentroid(); //获取geometry质心
    var geoText = new SuperMap.Geometry.GeoText(centroid.x, centroid.y, feature.attributes.NAME); 
    var geotextFeature = new SuperMap.Feature.Vector(geoText); 
    //labelFeatures.push(geotextFeature);
    // 获取要素中心点，实例化Point要素
    var geo = new SuperMap.Geometry.Point(centroid.x, centroid.y);
    var attrs = {};
    attrs.NAME = feature.attributes.NAME;  //区县名称
    //根据NAME对应赋值相应的数据~~根据数据库区县名称顺序
    var areaIndex = getFindDataByAreaName(feature.attributes.NAME); //获取区县index
    attrs.RES_dotdensity = dataList[areaIndex];//通过区县名称获取对应数据
    var fea = new SuperMap.Feature.Vector(geo, attrs);
    features.push(fea);
  }
  labelLayerSub.addFeatures(labelFeatures);
  themeLayerRank.addFeatures(features);
}

//等级专题图图层--获取rankThemeRange范围
function getRankThemeRange(){
  var rankThemeRange = [];
  var backupsList = [];
  //备份数组
  for(var i=0;i<dataList.length-2;i++){
    backupsList.push(dataList[i]);//取前8个数
  }
  var max = getListMaxNum(backupsList);//得到数组最大值
  var str = "" + max;
  var strlength = str.length;
  str = str.substring(0,1); //截取第一位
  var maxf = Number(str) + 1; //首位加1
  var decLocIndex = (max + "").indexOf("."); //获取小数点索引位置
  if(decLocIndex < 0){
    decLocIndex = 1; //没有小数
    for(var i=0;i<strlength-decLocIndex;i++){
      maxf += "0";
    }
  }else{
    for(var i=0;i<strlength-(strlength-decLocIndex+1);i++){
      maxf += "0";
    }
  }
  max = Number(maxf);
  rankThemeRange = [0, max];
  return rankThemeRange;
}

//等级专题图图层--显示地图弹窗
function showInfoWinRank(e) {
  // e.target 是图形对象，即数据的可视化对象。
  // 图形对象的 refDataID 属性是数据（feature）的 id 属性，它指明图形对象是由那个数据制作而来;
  // 图形对象的 dataInfo 属性是图形对象表示的具体数据，他有两个属性，field 和 value;
  if(e.target && e.target.refDataID && e.target.dataInfo) {
    closeInfoWinRank();
    // 获取图形对应的数据 (feature)
    var fea = themeLayerRank.getFeatureById(e.target.refDataID);
    var info = e.target.dataInfo;
    // 弹窗内容
    var contentHTML = "<div style='color: #000; background-color: #fff'>";
    contentHTML += "区县名称:<br><strong>" + fea.attributes.NAME + "</strong>";
    contentHTML += "<hr style='margin: 3px'>";
    var year = $('#an-select-year option:selected').text();//年份
    switch(info.field) {
      case "RES_dotdensity":
        contentHTML += year + "年资源价值量(元)<br/><strong>" + transitionNumToShortMillion(info.value,5) + "</strong>";
        break;
      default:
        contentHTML += "No Data";
    }
    contentHTML += "</div>";
    // 弹出框大小
    var infowinSize = (SuperMap.Browser.name == "firefox") ? new SuperMap.Size(210, 110) : new SuperMap.Size(200, 100);
    // 弹出窗地理位置 向右偏移R
    infowinPositionRank.x += info.r;
    var lonLat = map.getLonLatFromPixel(infowinPositionRank);
    infowinRank = new SuperMap.Popup("infowinRank", lonLat, infowinSize, contentHTML, false, false, null);
    infowinRank.setBackgroundColor("#fff");
    infowinRank.setOpacity(0.9);
    if(infowinRank) map.removePopup(infowinRank);
    map.addPopup(infowinRank);
  }
}

//等级专题图图层--移除等级专题图层
function removeThemeLayerRank() {
  if(themeLayerRank && isAddLayerRank){
    isAddLayerRank = false;
    clearThemeLayerRank();
    map.removeLayer(themeLayerRank);
    map.removeLayer(labelLayerSub);
  }
}

//等级专题图图层--清除等级专题图层中的内容
function clearThemeLayerRank() {
  if(themeLayerRank){
    themeLayerRank.clear();
    labelLayerSub.removeFeatures();
    closeInfoWinRank();
  }
}

//等级专题图图层--移除和销毁地图弹窗
function closeInfoWinRank() {
  if(infowinRank) {
    try {
      map.removePopup(infowinRank);
    } catch(e) {
      alert(e.message);
    }
  }
}

//---------------等级专题图End---------------

//---------------分段专题图Start---------------
//分段颜色数组--默认数组，其他在资源类型下拉框选择时设置
var colorList = ["#FDE2CA","#FACE9C","#F09C42","#D0770B","#945305"];
//分段专题图--设置图例分段值
function setLegendSubsectionNum(sublist){
  var list = transitionListNumToShort(sublist);//转换“万”或“亿”
  $("#spe-sub1").text(list[0] + " - " + list[1]);
  $("#spe-sub2").text(list[2] + " - " + list[3]);
  $("#spe-sub3").text(list[4] + " - " + list[5]);
  $("#spe-sub4").text(list[6] + " - " + list[7]);
  $("#spe-sub5").text(list[8] + "以上");
}

//分段专题图--设置图例分段颜色
function setLegendSubsectionColor(){
  $("#spe-sub-color1").attr("style", "background: " + colorList[0]);
  $("#spe-sub-color2").attr("style", "background: " + colorList[1]);
  $("#spe-sub-color3").attr("style", "background: " + colorList[2]);
  $("#spe-sub-color4").attr("style", "background: " + colorList[3]);
  $("#spe-sub-color5").attr("style", "background: " + colorList[4]);
}

//分段专题图~~~~样式设置根据范围分段
var themeLayerSub, labelLayerSub, isAddLayerSub = false;//判断是否添加图层
function createThemeLayerSub(){
  if(!isAddLayerSub){
    isAddLayerSub = true;
    // 定义 Range 分段专题图层
    themeLayerSub = new SuperMap.Layer.Range("ThemeLayer");
    //新建一个策略并使用在矢量要素图层(vector)上。 
    var strategy = new SuperMap.Strategy.GeoText(); 
    strategy.style = { 
      fontColor:"#00FFFF", 
      fontWeight:"bolder", 
      fontSize:"14px", 
      fill: true, 
      fillColor: "#FFFFFF", 
      fillOpacity: 1, 
      stroke: true, 
      strokeColor:"#8B7B8B" 
    }; 
    labelLayerSub = new SuperMap.Layer.Vector("labelLayerSub", {strategies: [strategy]}); 
    themeLayerSub.setOpacity(0.8);
    // 图层基础样式
    themeLayerSub.style = {
      shadowBlur: 16,
      shadowColor: "#000000",
      fillColor: "#FFFFFF",
      fontColor : '#00CCFF',
      fontSize : '14px',
      fontWeight : 700
    };
    // 开启 hover 高亮效果
    themeLayerSub.isHoverAble = true;
    // hover高亮样式
    themeLayerSub.highlightStyle = {
      stroke: true,
      strokeWidth: 1,
      strokeColor: '#4AFFE4',
      fillColor: "#00EEEE",
      //shadowBlur: 6,
      //shadowColor: "#000000",
      //shadowOffsetX: 6,
      //shadowOffsetY: 6,
      fillOpacity: 0.6
    };
    // 用于范围分段的属性字段名称
    themeLayerSub.themeField = "RES_DENSITY";
    // 风格数组，设定分段范围对应的样式
    themeLayerSub.styleGroups = [{
      start: sublist[0],
      end: sublist[1],  //根据查询数据动态分段
      style: {
        color: colorList[0]
      }
    }, {
      start: sublist[2],
      end: sublist[3],
      style: {
        color: colorList[1]
      }
    }, {
      start: sublist[4],
      end: sublist[5],
      style: {
        color: colorList[2]
      }
    }, {
      start: sublist[6],
      end: sublist[7],
      style: {
        color: colorList[3]
      }
    }, {
      start: sublist[8],
      end: 10000000000000000, //无限值
      style: {
        color: colorList[4]
      }
    }]
    // 注册 mousemove 事件
    themeLayerSub.on("mousemove", evnSub);
    //添加到地图     
    map.addLayer(labelLayerSub);
    map.addLayer(themeLayerSub); 
  }else{
    //已存在图层，修改分段范围属性
    themeLayerSub.styleGroups = [{
      start: sublist[0],
      end: sublist[1],  //根据查询数据动态分段
      style: {
        color: colorList[0]
      }
    }, {
      start: sublist[2],
      end: sublist[3],
      style: {
        color: colorList[1]
      }
    }, {
      start: sublist[4],
      end: sublist[5],
      style: {
        color: colorList[2]
      }
    }, {
      start: sublist[6],
      end: sublist[7],
      style: {
        color: colorList[3]
      }
    }, {
      start: sublist[8],
      end: 10000000000000000, //无限值
      style: {
        color: colorList[4]
      }
    }]
  }  
  addThemeLayerSub();//查询feature数据
}

//构建 feature 数据, 专题图的数据必须是 SuperMap.Feature.Vector
function addSubThemeLayer(getFeaturesEventArgs){
  clearLayerSub();//清除图层要素
  var result = getFeaturesEventArgs.result;
  if(result && result.features) {
    var features = [];
    //添加区县标签
    for(var i=0;i<result.features.length;i++){
      var feature = result.features[i];
      var style = {
        strokeColor : 'Orange',// 边颜色
        strokeWidth : 0,// 边宽度
        strokeDashstyle : 'solid',// 边类型，虚线
        fillColor : 'Orange',// 填充颜色
        fillOpacity : 0,// 透明度
        label : feature.attributes.NAME,
        fontColor : '#00FFFF',
        fontOpacity : 1,
        fontSize : '14px',
        fontWeight : 700
      };
      var geometry = feature.geometry;
      var attributes = feature.attributes;
      var pointFeature = new SuperMap.Feature.Vector(geometry,attributes,style); 
      var centroid = feature.geometry.getCentroid(); //获取geometry质心
      var geoText = new SuperMap.Geometry.GeoText(centroid.x, centroid.y, feature.attributes.NAME); 
      var geotextFeature = new SuperMap.Feature.Vector(geoText); 
      features.push(pointFeature);
    }
    labelLayerSub.addFeatures(features);
    //添加专题图feature
    themeLayerSub.addFeatures(features);
  }
  updateDataSub();//更新显示数据
  //显示图例
  document.getElementById("mapLegend").style.display = "block";
}

//分段专题图--事件处理，控制信息框数据显示
function evnSub(e) {
  if(e.target && e.target.refDataID) {
    document.getElementById("infoBox").style.display = "block";
    var fid = e.target.refDataID;
    var fea = themeLayerSub.getFeatureById(fid);
    if(fea) {
      document.getElementById("infoContent").innerHTML = "";
      document.getElementById("infoContent").innerHTML += "区县名称：" + fea.attributes.NAME + "<br/>";
      document.getElementById("infoContent").innerHTML += "资源价值量(元)：" + transitionNumToShortMillion(parseFloat(fea.attributes.RES_DENSITY),5) + "<br/>";
    }
  } else {
    document.getElementById("infoContent").innerHTML = "";
    document.getElementById("infoBox").style.display = "none";
  }
}

//分段专题图--移除分段专题图图层
function removeThemeLayerSub(){
  if(themeLayerSub && isAddLayerSub){
    isAddLayerSub = false; 
    clearLayerSub();
    map.removeLayer(themeLayerSub);
    map.removeLayer(labelLayerSub);
  }
}

//分段专题图--清空分段专题图图层要素features
function clearLayerSub() {
  if(themeLayerSub){
    document.getElementById("mapLegend").style.display = "none";
    document.getElementById("infoBox").style.display = "none";
    //先清除上次的显示结果
    themeLayerSub.clear();
    labelLayerSub.removeFeatures();
  }
}

//分段专题图--更新显示数据
function updateDataSub() {
  var feas = themeLayerSub.features;
  for(var i = 0, len = feas.length; i < len; i++) {
    var fea = feas[i];
    //根据NAME对应赋值相应的数据
    var areaIndex = getFindDataByAreaName(fea.attributes.NAME); //获取区县对应index
    fea.attributes.RES_DENSITY = dataList[areaIndex]; //更新数据~~~绑定dataList保存的对应业务数据库区县顺序的数据
  }
  themeLayerSub.redraw();//重绘图层
}

//分段专题图---根据查询数据生成对应分段范围
var sublist = [];//分段数组
function subsectionThematicDataBySelect(dataList){
  sublist = [];//初始化
  var backupsList = [];
  //备份数组
  for(var i=0;i<dataList.length-2;i++){
    backupsList.push(dataList[i]);//取前8个数
  }
  var max = getListMaxNum(backupsList);//得到最大值
  var meanValue = max/5;//平均数
  meanValue = getNearNumToDown(meanValue);//取接近数--
  //分段数
  var overlayCount = 0;
  sublist.push(overlayCount);
  for(var i=0;i<4;i++){
    if(i>0){
      sublist.push(overlayCount);
    }
    overlayCount += meanValue;
    sublist.push(overlayCount);
  }
  sublist.push(overlayCount);
  //设置图例分段值
  setLegendSubsectionNum(sublist);
  //设置图例分段颜色
  setLegendSubsectionColor();
  //设置年份
  var year = $("#an-select-year option:selected").text();
  $("#spe-year").html("资源价值量</br>("+year+"年)");
}

//数组全部数转换带“万”，“亿”
function transitionListNumToShort(list){
  var strlist = [];
  //没有处理小数的
  for(var i=0;i<list.length;i++){
    var num = list[i];
    if((num >= 10000 && num < 100000000)){
      num = (num+"").substring(0,(num+"").length-4) + "万";
    }else if(num >= 100000000){
      num = (num+"").substring(0,(num+"").length-8) + "亿";
    }
    strlist.push(num);
  }
  return strlist;
}

//数组全部数转换带“亿”
function transitionListNumToShortMillion(list){
  var strlist = [];
  //没有处理小数的
  for(var i=0;i<list.length;i++){
    var num = list[i];
    num = transitionNumToShortMillion(num,5);
    strlist.push(num);
  }
  return strlist;
}

//数四舍五入并且转换带“亿”
function transitionNumToShortMillion(num,n){
  var reg = /^-?(([1-9][0-9]*\.[0-9][0-9]*)|([0]\.[0-9][0-9]*)|([1-9][0-9]*)|([0]{1}))$/; //判断数或小数
  if (!reg.test(num)){
    return num;
  }
  num = num / 100000000;
  num = roundWantNum(num, n); //四舍五入取n位小数
  if(num != 0){
    num = num + "亿";
  }
  return num;
}

//数四舍五入并且转换带“万”，“亿”
function transitionNumToShort(num,n){
  var reg = /^-?(([1-9][0-9]*\.[0-9][0-9]*)|([0]\.[0-9][0-9]*)|([1-9][0-9]*)|([0]{1}))$/; //判断数或小数
  if (!reg.test(num)){
    return num;
  }
  if((num >= 10000 && num < 100000000) || (num <= -10000 && num > -100000000)){
    num = num / 10000;
    num = roundWantNum(num, n); //四舍五入取n位小数
    num = num + "万";
  }else if((num >= 100000000) || (num <= -100000000)){
    num = num / 100000000;
    num = roundWantNum(num, n); //四舍五入取n位小数
    num = num + "亿";
  }else {
    num = roundWantNum(num, n);
  }
  return num;
}

//带“万”，“亿”反转回对应个数0
function reversalShortNumToLong(shortnum){
  //判断是否存在数字和文字,例如：1万
  var reg = /^-?(([1-9][0-9]*\.[0-9][0-9]*)|([0]\.[0-9][0-9]*)|([1-9][0-9]*)|([0]{1}))[\u4e00-\u9fa5]+$/; 
  if(!reg.test(shortnum)){
    return shortnum; //不是数字+文字直接返回
  }
  if(shortnum.indexOf(".") == -1){ //无小数
    if(shortnum.indexOf("万") != -1){
      shortnum = shortnum.replace("万", "0000");
    }else if(shortnum.indexOf("亿") != -1){
      shortnum = shortnum.replace("亿", "00000000");
    }
  }else{  //有小数
    if(shortnum.indexOf("万") != -1){
      shortnum = shortnum.replace("万", "");
      shortnum = Number(shortnum)*10000;
    }else if(shortnum.indexOf("亿") != -1){
      shortnum = shortnum.replace("亿", "");
      shortnum = Number(shortnum)*100000000;
    }
  }
  shortnum = Number(shortnum);
  return shortnum;
}

//四舍五入取n位小数
function roundWantNum(num, n){
  var str = "1";
  for(var i=0;i<n;i++){
    str += "0";
  }
  var strNum = Number(str);
  return Math.round(num*strNum)/strNum;
}

//返回接近数~~~取首位，后面换0
function getNearNumToDown(num){
  var reNum = 0;
  var str = "" + num;
  var strlength = str.length;
  str = str.substring(0,1); //截取第一位
  var decLocIndex = (num + "").indexOf("."); //获取小数点索引位置
  if(decLocIndex < 0){
    decLocIndex = 1; //没有小数
    for(var i=0;i<strlength-decLocIndex;i++){
      str += "0";
    }
  }else{
    for(var i=0;i<strlength-(strlength-decLocIndex+1);i++){
      str += "0";
    }
  }
  reNum = Number(str);
  return reNum;
}

//返回接近数~~~取首位并且+1，后面换0
function getNearNumToUp(num){
  var reNum = 0;
  var str = "" + num;
  var strlength = str.length;
  str = str.substring(0,1); //截取第一位
  str = Number(str)+1; //首位加1
  var decLocIndex = (num + "").indexOf("."); //获取小数点索引位置
  if(decLocIndex < 0){
    decLocIndex = 1; //没有小数
    for(var i=0;i<strlength-decLocIndex;i++){
      str += "0";
    }
  }else{
    for(var i=0;i<strlength-(strlength-decLocIndex+1);i++){
      str += "0";
    }
  }
  reNum = Number(str); //转换完毕没有小数了
  return reNum;
}

//返回数组最大值
function getListMaxNum(list){
  var max = 0;
  for(var i=0;i<list.length;i++){
    if(max < list[i]){
      max = list[i];
    }
  }
  return max;
}

//返回数组最小值
function getListMixNum(){
  var mix = 0;
  for(var i=0;i<list.length;i++){
    if(mix > list[i]){
      mix = list[i];
    }
  }
  return mix;
}
//---------------分段专题图End---------------

//查询失败
function processFailed(e) {
  alert(e.error.errorMsg);
}

//================================分析面板-专题图End========================

//========================地图打印Start========================
/**
*打印地图，支持ie9及以上，chrome，firefox等.
*请注意相关css,js文件是否存在.
*Parameters:
*id <String>  id 为map div的id
*/
function createPrintMap(id) {
  var broz = SuperMap.Browser.name;
  if(broz == 'msie' && parseInt(SuperMap.Browser.version) < 9) {
    alert("ie9版本以下部分打印功能不支持");
    return;
  }
  var printWindow = window.open("");
  var strInnerHTML = document.getElementById(id).innerHTML;
  var strHeader = "<!DOCTYPE html><html><head><META HTTP-EQUIV='pragma' CONTENT='no-cache'><META HTTP-EQUIV='Cache-Control' CONTENT='no-cache, must-revalidate'><META HTTP-EQUIV='expires' CONTENT='Wed, 26 Feb 1997 08:21:57 GMT'><meta http-equiv='Content-Type' content='text/html; charset=utf-8' /><meta name='viewport' content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0' /><meta name='apple-mobile-web-app-capable' content='yes' /><title>地图打印</title>";
  var strCSS = "<link href='/ResourceCheck/web/SuperMap/theme/default/style.css' rel='stylesheet'><link href='/ResourceCheck/web/SuperMap/css/sm-doc.css' rel='stylesheet' />";
  var strScript = "<script src='/ResourceCheck/web/SuperMap/js/jquery.js'><\/script><script type = 'text/javascript'>" + "\n" + "function printDiv(){$('.newuiPrint').css({'display':'none'});window.print();$('.newuiPrint').css({'display':'block'});}<\/script>";
  var strBody = "</head><body style='margin: 0px;'><div class='print-header'><div class='superD'><h3>地图</h3></div><div id='" + id + "' >" + strInnerHTML + "</div><div id='superft'><div class='printClose'>" + "<span class='newuiPrint' onclick = 'printDiv()'></span></div></div></div></body></html>";
  var strHTML = strHeader + strCSS + strScript + strBody;
  printWindow.document.write(strHTML);
  printWindow.document.close();
  
  function onloadHTML() {
    var strDOM = printWindow.document.getElementById(id).children[0].children;
    for(var i = 0, length = strDOM.length; i < length; i++) {
      var idStr = strDOM[i].id;
      if(idStr.indexOf("SuperMap.Control.ScaleLine") == -1 && idStr.indexOf("SuperMap.Map") == -1) {
        strCss = strDOM[i].style.cssText;
        strCss = strCss + "display: none;";
        strDOM[i].style.cssText = strCss;
      }
    }
    var canvasPrint = printWindow.document.getElementsByTagName("canvas");
    var canvasMap = document.getElementsByTagName("canvas");
    for(var i = 0, length = canvasPrint.length; i < length; i++) {
      pasteCanvas(canvasMap[i], canvasPrint[i]);
    }
  }
  if(broz == 'firefox') {
    printWindow.onload = onloadHTML;
  } else if(broz == 'safari' || broz == 'chrome' || broz == 'msie') {
    window.setTimeout(onloadHTML, 50);
  }
}
//如果涉及到Canvas的图层打印，需要将范例发布出来运行，否则会产生跨域的问题
function pasteCanvas(sCanvas /*source*/ , dCanvas /*destination*/ ) {
  var w = sCanvas.width,
    h = sCanvas.height;
  dCanvas.width = w;
  dCanvas.height = h;
  var viewerImageSrc = sCanvas.toDataURL("image/png");
  var viewerImage = new Image();
  viewerImage.src = viewerImageSrc;
  var dContext = dCanvas.getContext("2d");
  dContext.drawImage(viewerImage, 0, 0, w, h);
}
//========================地图打印End========================

//layUI提示弹窗--询问选择弹窗
function tipMapStaticsNoDataAsk(asktext, btnture, btnfalse){
  layui.use('layer', function(){
    var layer = layui.layer;
    layer.confirm(asktext, {
      btn: [btnture,btnfalse] //按钮
    }, function(){
      //确定
      
    }, function(){
      //取消
      
    });
  });
}

//layUI提示弹窗--不自动关闭
function tipMapStaticsNoData(text){
  layui.use('layer', function(){
    var layer = layui.layer;
    layer.open({
      type: 1
      ,offset: 't' //具体配置参考：offset参数项
      ,content: '<div style="min-width:200px;padding:15px;text-align:center;">'+text+'</div>'
      ,closeBtn: 0
      ,btn: '关闭'
      ,btnAlign: 't' //按钮居上
      ,shade: 0 //不显示遮罩
      ,yes: function(index){
        layer.close(index);
      }
    });
  });
}

//layUI提示弹窗--自动关闭
function tipMapStaticsNoDataAutoHide(text){
  layui.use('layer', function(){
    var layer = layui.layer;
    layer.msg(text);
  });
}

//加载失败执行方法
function loadFailMsg(textStatus){
  if(textStatus == 500){
    tipMapStaticsNoDataByTime("服务器错误");
  }else if(textStatus == 404){
    tipMapStaticsNoDataByTime("资源找不到");
  }
}

//layUI提示弹窗--不自动关闭--限制2秒内不重复弹出
var oldTipTime = 0;
function tipMapStaticsNoDataByTime(text){
  var tipTime = new Date().getTime();
  if((tipTime - oldTipTime) > 2000){
    oldTipTime = tipTime;
    layui.use('layer', function(){
      var layer = layui.layer;
      layer.open({
        type: 1
        ,offset: 't' //具体配置参考：offset参数项
        ,content: '<div style="min-width:200px;padding:15px;text-align:center;">'+text+'</div>'
        ,closeBtn: 0
        ,btn: '关闭'
        ,btnAlign: 't' //按钮居上
        ,shade: 0 //不显示遮罩
        ,yes: function(index){
          layer.close(index);
        }
      });
    });
  }
}

