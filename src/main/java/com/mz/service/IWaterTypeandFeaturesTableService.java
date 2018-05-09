package com.mz.service;

import com.mz.entity.WaterTypeandFeaturesTable;
import com.mz.entity.YearTable;
import com.mz.vo.ShowAreaCheck;
import com.mz.vo.TypeandFeaturesTableVo;
import com.mz.vo.WaterTypeandFeaturesTableVo;

import java.util.List;

import com.baomidou.mybatisplus.service.IService;

/**
 * <p>
 *  服务类
 * </p>
 *
 * @author 
 * @since 2018-04-16
 */
public interface IWaterTypeandFeaturesTableService extends IService<WaterTypeandFeaturesTable> {
	
	WaterTypeandFeaturesTable existDataNoInser(WaterTypeandFeaturesTable wtft);
	
	//核算对比展示-水资源-各区县实物量查询
	List<WaterTypeandFeaturesTableVo> findWaterDataAllByCondition(int yearID, int waterTypeID);
	//核算对比展示-水资源-各区县价值量查询
	List<WaterTypeandFeaturesTableVo> findWaterValueDataAllByCondition(int yearID, int waterTypeID);
	//核算对比展示-土地资源-各区县价值量查询
	List<WaterTypeandFeaturesTableVo> findLandValueDataAllByCondition(int yearID, int waterTypeID);
	//核算对比展示-林木资源-各区县价值量查询
	List<WaterTypeandFeaturesTableVo> findForestValueDataAllByCondition(int yearID, int waterTypeID);
	//核算对比展示-矿产资源-各区县价值量查询
	List<WaterTypeandFeaturesTableVo> findMineValueDataAllByCondition(int yearID, int waterTypeID);
	//核算对比展示-可再生能源-各区县价值量查询
	List<WaterTypeandFeaturesTableVo> findRenewableValueDataAllByCondition(int yearID, int waterTypeID);
	//核算对比展示-大气资源-各区县价值量查询
	List<WaterTypeandFeaturesTableVo> findAtmosphereValueDataAllByCondition(int yearID, int waterTypeID);
	
	//价值量总统计-获取有数据的年份
	List<YearTable> findTypeValueYearByCondition();
	//核算结果统计表弹窗-价值量总统计
	List<TypeandFeaturesTableVo> findTypeValueDataByCondition(int yearID, int waterTypeID);
	
	//水资源-获取有数据的年份
	List<YearTable> findWaterYearByCondition();
	//土地资源-获取有数据的年份
	List<YearTable> findLandYearByCondition();
	//林木资源-获取有数据的年份
	List<YearTable> findForestYearByCondition();
	//矿产资源-获取有数据的年份
	List<YearTable> findMineYearByCondition();
	//可再生能源-获取有数据的年份
	List<YearTable> findRenewableYearByCondition();
	//大气资源-获取有数据的年份
	List<YearTable> findAtmosphereYearByCondition();
	
	//核算结果统计表弹窗-实物量明细查询
	List<WaterTypeandFeaturesTableVo> findWaterDataByCondition(int yearID, int waterTypeID);
	//核算结果统计表弹窗-价值量明细查询
	List<WaterTypeandFeaturesTableVo> findWaterValueDataByCondition(int yearID, int waterTypeID);
	
	//核算结果统计表弹窗-土地实物量明细查询
	List<WaterTypeandFeaturesTableVo> findLandDataByCondition(int yearID, int waterTypeID);
	//核算结果统计表弹窗-土地价值量明细查询
	List<WaterTypeandFeaturesTableVo> findLandValueDataByCondition(int yearID, int waterTypeID);
	
	//核算结果统计表弹窗-林木实物量明细查询
	List<WaterTypeandFeaturesTableVo> findForestDataByCondition(int yearID, int waterTypeID);
	//核算结果统计表弹窗-林木价值量明细查询
	List<WaterTypeandFeaturesTableVo> findForestValueDataByCondition(int yearID, int waterTypeID);
	
	//核算结果统计表弹窗-矿产实物量明细查询
	List<WaterTypeandFeaturesTableVo> findMineDataByCondition(int yearID, int waterTypeID);
	//核算结果统计表弹窗-矿产价值量明细查询
	List<WaterTypeandFeaturesTableVo> findMineValueDataByCondition(int yearID, int waterTypeID);
	
	//核算结果统计表弹窗-可再生能源实物量明细查询
	List<WaterTypeandFeaturesTableVo> findRenewableDataByCondition(int yearID, int waterTypeID);
	//核算结果统计表弹窗-可再生能源价值量明细查询
	List<WaterTypeandFeaturesTableVo> findRenewableValueDataByCondition(int yearID, int waterTypeID);
	
	//核算结果统计表弹窗-大气实物量明细查询
	List<WaterTypeandFeaturesTableVo> findAtmosphereDataByCondition(int yearID, int waterTypeID);
	//核算结果统计表弹窗-大气价值量明细查询
	List<WaterTypeandFeaturesTableVo> findAtmosphereValueDataByCondition(int yearID, int waterTypeID);
	
	//核算-统计图-时间过度统计-明细类型查询-水资源
	List<WaterTypeandFeaturesTable> findWaterMxDateSelectByCondition(int waterTypeID);
	//核算-统计图-时间过度统计-明细类型数据查询-水资源
	List<WaterTypeandFeaturesTableVo> findWaterMxDateDataByCondition(String waterFeatures);
	//核算-统计图-时间过度统计-明细类型查询-土地资源
	List<WaterTypeandFeaturesTable> findLandMxDateSelectByCondition(int waterTypeID);
	//核算-统计图-时间过度统计-明细类型数据查询-土地资源
	List<WaterTypeandFeaturesTableVo> findLandMxDateDataByCondition(String waterFeatures);
	//核算-统计图-时间过度统计-明细类型查询-林木资源
	List<WaterTypeandFeaturesTable> findForestMxDateSelectByCondition(int waterTypeID);
	//核算-统计图-时间过度统计-明细类型数据查询-林木资源
	List<WaterTypeandFeaturesTableVo> findForestMxDateDataByCondition(String waterFeatures);
	//核算-统计图-时间过度统计-明细类型查询-矿产资源
	List<WaterTypeandFeaturesTable> findMineMxDateSelectByCondition(int waterTypeID);
	//核算-统计图-时间过度统计-明细类型数据查询-矿产资源
	List<WaterTypeandFeaturesTableVo> findMineMxDateDataByCondition(String waterFeatures);
	//核算-统计图-时间过度统计-明细类型查询-可再生能源
	List<WaterTypeandFeaturesTable> findRenewableMxDateSelectByCondition(int waterTypeID);
	//核算-统计图-时间过度统计-明细类型数据查询-可再生能源
	List<WaterTypeandFeaturesTableVo> findRenewableMxDateDataByCondition(String waterFeatures);
	//核算-统计图-时间过度统计-明细类型查询-大气资源
	List<WaterTypeandFeaturesTable> findAtmosphereMxDateSelectByCondition(int waterTypeID);
	//核算-统计图-时间过度统计-明细类型数据查询-大气资源
	List<WaterTypeandFeaturesTableVo> findAtmosphereMxDateDataByCondition(String waterFeatures);
		
	ShowAreaCheck selectAreaCheck(int yearID,int areaID);
}
