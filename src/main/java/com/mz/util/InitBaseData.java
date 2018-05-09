package com.mz.util;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import com.alibaba.fastjson.JSONObject;
import com.mz.entity.AreaTable;
import com.mz.entity.WaterTypeTable;
import com.mz.entity.YearTable;
import com.mz.mapper.AreaTableMapper;
import com.mz.mapper.WaterTypeTableMapper;
import com.mz.mapper.WaterTypeandFeaturesTableMapper;
import com.mz.mapper.YearTableMapper;

@Component
public class InitBaseData {

	//年份
	@Autowired
	YearTableMapper yearTableMapper;

	// 区县
	@Autowired
	AreaTableMapper areaTableMapper;



	// 水资源类别
	@Autowired
	WaterTypeTableMapper waterTypeTableMapper;
	
	// 动态年份保存
	@Autowired
	WaterTypeandFeaturesTableMapper waterTypeandFeaturesTableMapper;

	// 存储格式{名称：id}
	JSONObject jsonObjectValueKey;
	// 存储格式{id：名称}
	JSONObject jsonObjectKeyValue;
	// 存储原有列表数据
	JSONObject list;

	// 启动加载基础数据
	@PostConstruct
	public void initLoadData() {
		jsonObjectValueKey = new JSONObject();
		jsonObjectKeyValue=new JSONObject();
		list = new JSONObject();

		// 数据格式{value:key}
		Map<Object, Integer> valueKey = new HashMap<>();
		// 数据格式{key:value}
		Map<Integer, Object> keyValue = new HashMap<>();

		//年
		List<YearTable> yearTables = yearTableMapper.selectList(null);
		for (YearTable yt : yearTables) {
			valueKey.put(yt.getYearMC(), yt.getYearID());
			keyValue.put(yt.getYearID(), yt.getYearMC());
		}
		list.put("year", yearTables);
		jsonObjectValueKey.put("year", valueKey);
		jsonObjectKeyValue.put("year", keyValue);

		// 区县
		List<AreaTable> area = areaTableMapper.selectList(null);
		valueKey = new HashMap<>();
		keyValue = new HashMap<>();
		for (AreaTable at : area) {
			valueKey.put(at.getAreaMC(), at.getAreaID());
			keyValue.put(at.getAreaID(), at.getAreaMC());
		}
		list.put("area", area);
		jsonObjectValueKey.put("area", valueKey);
		jsonObjectKeyValue.put("area", keyValue);

		

		// 水资源类别
		List<WaterTypeTable> waterTypeTables = waterTypeTableMapper.selectList(null);
		valueKey = new HashMap<>();
		keyValue = new HashMap<>();
		for (WaterTypeTable wtt : waterTypeTables) {
			valueKey.put(wtt.getWaterTypeMC(), wtt.getWaterTypeID());
			keyValue.put(wtt.getWaterTypeID(), wtt.getWaterTypeMC());
		}
		list.put("waterTypeTables", waterTypeTables);
		jsonObjectValueKey.put("waterTypeTables", valueKey);
		jsonObjectKeyValue.put("waterTypeTables", keyValue);
		
		// 动态年份---价值量总统计-获取有数据的年份
		List<YearTable> allValueYear = waterTypeandFeaturesTableMapper.findTypeValueYearByCondition();
		valueKey = new HashMap<>();
		keyValue = new HashMap<>();
		for (YearTable year : allValueYear) {
			valueKey.put(year.getYearMC(), year.getYearID());
			keyValue.put(year.getYearID(), year.getYearMC());
		}
		list.put("allValueYear", allValueYear);
		jsonObjectValueKey.put("allValueYear", valueKey);
		jsonObjectKeyValue.put("allValueYear", keyValue);
		
		// 动态年份---水资源-获取有数据的年份
		List<YearTable> waterValueYear = waterTypeandFeaturesTableMapper.findWaterYearByCondition();
		valueKey = new HashMap<>();
		keyValue = new HashMap<>();
		for (YearTable year : waterValueYear) {
			valueKey.put(year.getYearMC(), year.getYearID());
			keyValue.put(year.getYearID(), year.getYearMC());
		}
		list.put("waterValueYear", waterValueYear);
		jsonObjectValueKey.put("waterValueYear", valueKey);
		jsonObjectKeyValue.put("waterValueYear", keyValue);
		
		// 动态年份---土地资源-获取有数据的年份
		List<YearTable> landValueYear = waterTypeandFeaturesTableMapper.findLandYearByCondition();
		valueKey = new HashMap<>();
		keyValue = new HashMap<>();
		for (YearTable year : landValueYear) {
			valueKey.put(year.getYearMC(), year.getYearID());
			keyValue.put(year.getYearID(), year.getYearMC());
		}
		list.put("landValueYear", landValueYear);
		jsonObjectValueKey.put("landValueYear", valueKey);
		jsonObjectKeyValue.put("landValueYear", keyValue);
		
		// 动态年份---林木资源-获取有数据的年份
		List<YearTable> forestValueYear = waterTypeandFeaturesTableMapper.findForestYearByCondition();
		valueKey = new HashMap<>();
		keyValue = new HashMap<>();
		for (YearTable year : forestValueYear) {
			valueKey.put(year.getYearMC(), year.getYearID());
			keyValue.put(year.getYearID(), year.getYearMC());
		}
		list.put("forestValueYear", forestValueYear);
		jsonObjectValueKey.put("forestValueYear", valueKey);
		jsonObjectKeyValue.put("forestValueYear", keyValue);
		
		// 动态年份---矿产资源-获取有数据的年份
		List<YearTable> mineValueYear = waterTypeandFeaturesTableMapper.findMineYearByCondition();
		valueKey = new HashMap<>();
		keyValue = new HashMap<>();
		for (YearTable year : mineValueYear) {
			valueKey.put(year.getYearMC(), year.getYearID());
			keyValue.put(year.getYearID(), year.getYearMC());
		}
		list.put("mineValueYear", mineValueYear);
		jsonObjectValueKey.put("mineValueYear", valueKey);
		jsonObjectKeyValue.put("mineValueYear", keyValue);
		
		// 动态年份---可再生能源-获取有数据的年份
		List<YearTable> renewableValueYear = waterTypeandFeaturesTableMapper.findRenewableYearByCondition();
		valueKey = new HashMap<>();
		keyValue = new HashMap<>();
		for (YearTable year : renewableValueYear) {
			valueKey.put(year.getYearMC(), year.getYearID());
			keyValue.put(year.getYearID(), year.getYearMC());
		}
		list.put("renewableValueYear", renewableValueYear);
		jsonObjectValueKey.put("renewableValueYear", valueKey);
		jsonObjectKeyValue.put("renewableValueYear", keyValue);
		
		// 动态年份---大气资源-获取有数据的年份
		List<YearTable> atmosphereValueYear = waterTypeandFeaturesTableMapper.findAtmosphereYearByCondition();
		valueKey = new HashMap<>();
		keyValue = new HashMap<>();
		for (YearTable year : atmosphereValueYear) {
			valueKey.put(year.getYearMC(), year.getYearID());
			keyValue.put(year.getYearID(), year.getYearMC());
		}
		list.put("atmosphereValueYear", atmosphereValueYear);
		jsonObjectValueKey.put("atmosphereValueYear", valueKey);
		jsonObjectKeyValue.put("atmosphereValueYear", keyValue);

	}

	/**
	 * 
	 * @param name
	 *            可选参数 year area  waterTypeTables
	 * @return 对应name返回 List集合
	 */
	public Object getList(String name) {
		return list.get(name);
	}

	/**
	 * 
	 * @param name
	 *            year area  waterTypeTables
	 * @return 存储格式{名称：id}
	 */
	@SuppressWarnings("unchecked")
	public Map<Object, Integer> getValueKey(String name) {
		return (Map<Object, Integer>) jsonObjectValueKey.get(name);
	}

	/**
	 * 
	 * @param name
	 *            可选参数 year area  waterTypeTables
	 * @return 存储格式{id：名称}
	 */
	@SuppressWarnings("unchecked")
	public Map<Integer, Object> getKeyValue(String name) {
		return (Map<Integer, Object>) jsonObjectKeyValue.get(name);
	}

}
