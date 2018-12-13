//index.js
//获取应用实例
const app = getApp()

Page({

  data: {
    //默认未获取地址
    hasLocation: false,
    info: '',
    longitude: '',
    latitude: '',
    resInfo:'',
    info:'',
    tw:''
  },
  setInfo: function(rres){
    var location = rres.data.HeWeather6[0].basic.parent_city + " " + rres.data.HeWeather6[0].basic.location;
    console.log("city", rres.data.HeWeather6[0].basic.parent_city + " " + rres.data.HeWeather6[0].basic.location)
    console.log(rres)
    var todayweather = rres.data.HeWeather6[0].daily_forecast[0]
    console.log(todayweather)
    var weather_info = todayweather.cond_txt_d+' '+todayweather.wind_dir

    this.setData({ 
      tw:todayweather,
      info_location: location ,
      weather: todayweather.cond_txt_d,
      // update_time:,
      wind_dir:todayweather.wind_dir,
      tmp_min:todayweather.tmp_min,
      tmp_max:todayweather.tmp_max,
      hum:todayweather.hum,
      wind_sc:todayweather.wind_sc,
      cond_code_d_src:'../../cond-icon/'+ todayweather.cond_code_d+
      '.png'
      
    })
  },
  getlocal: function (e) {
    var that = this;
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        that.setData({
          longitude: res.longitude, // 经度
          latitude: res.latitude
        })
        console.log(that.data.longitude)
        console.log(that.data.latitude)
        that.getWeatherInfo()
      }
    })
  },
  onLoad: function () {
    this.getlocal();
    // this.setInfo();
    // this.getWeatherInfo();
  },
  getWeatherInfo: function () {
    var that = this;
    console.log(that.data.longitude)
    wx.request({
      url: 'https://free-api.heweather.com/s6/weather/forecast?location=' + that.data.longitude+','+that.data.latitude+'&key=9ba3f799e1ca4f8b940476b9d70d54e8',
      method: 'get',
      success(res) {
        that.setData({
          resInfo:res.data
        })
        console.log("res", res)
        console.log("city", res.data.HeWeather6[0].basic.parent_city+" "+res.data.HeWeather6[0].basic.location)
        var todayweather = res.data.HeWeather6[0].daily_forecast[0]
        console.log(todayweather)
        // this.setData({info:res.data.HeWeather6[0].basic.location})
        that.setInfo(res)
      }
    })
  }
})