package com.mz.mapper;

import com.mz.entity.WaterTypeandFeaturesTable;
import com.mz.entity.YearTable;
import com.mz.vo.ShowAreaCheck;
import com.mz.vo.TypeandFeaturesTableVo;
import com.mz.vo.WaterTypeandFeaturesTableVo;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.baomidou.mybatisplus.mapper.BaseMapper;

/**
 * <p>
  *  Mapper 接口
 * </p>
 *
 * @author 
 * @since 2018-04-16
 */
public interface WaterTypeandFeaturesTableMapper extends BaseMapper<WaterTypeandFeaturesTable> {

	WaterTypeandFeaturesTable selectDataIsExist(@Param("wtft") WaterTypeandFeaturesTable wtft);

	void insertTypeAndFeatures(@Param("wtft")WaterTypeandFeaturesTable wtft);
	
	//核算对比展示-水资源-各区县实物量查询
	List<WaterTypeandFeaturesTableVo> findWaterDataAllByCondition(@Param("yearID")int yearID, @Param("waterTypeID")int waterTypeID);
	//核算对比展示-水资源-各区县价值量查询
	List<WaterTypeandFeaturesTableVo> findWaterValueDataAllByCondition(@Param("yearID")int yearID, @Param("waterTypeID")int waterTypeID);
	//核算对比展示-土地资源-各区县价值量查询
	List<WaterTypeandFeaturesTableVo> findLandValueDataAllByCondition(@Param("yearID")int yearID, @Param("waterTypeID")int waterTypeID);
	//核算对比展示-林木资源-各区县价值量查询
	List<WaterTypeandFeaturesTableVo> findForestValueDataAllByCondition(@Param("yearID")int yearID, @Param("waterTypeID")int waterTypeID);
	//核算对比展示-矿产资源-各区县价值量查询
	List<WaterTypeandFeaturesTableVo> findMineValueDataAllByCondition(@Param("yearID")int yearID, @Param("waterTypeID")int waterTypeID);
	//核算对比展示-可再生能源-各区县价值量查询
	List<WaterTypeandFeaturesTableVo> findRenewableValueDataAllByCondition(@Param("yearID")int yearID, @Param("waterTypeID")int waterTypeID);
	//核算对比展示-大气资源-各区县价值量查询
	List<WaterTypeandFeaturesTableVo> findAtmosphereValueDataAllByCondition(@Param("yearID")int yearID, @Param("waterTypeID")int waterTypeID);
	
	//核算结果统计表弹窗-价值量总统计-获取有数据的年份
	List<YearTable> findTypeValueYearByCondition();
	//核算结果统计表弹窗-价值量总统计
	List<TypeandFeaturesTableVo> findTypeValueDataByCondition(@Param("yearID")int yearID, @Param("waterTypeID")int waterTypeID);
		
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
		
	//核算结果统计表弹窗-水实物量明细查询
	List<WaterTypeandFeaturesTableVo> findWaterDataByCondition(@Param("yearID")int yearID, @Param("waterTypeID")int waterTypeID);
	//核算结果统计表弹窗-水价值量明细查询
	List<WaterTypeandFeaturesTableVo> findWaterValueDataByCondition(@Param("yearID")int yearID, @Param("waterTypeID")int waterTypeID);
	
	//核算结果统计表弹窗-土地实物量明细查询
	List<WaterTypeandFeaturesTableVo> findLandDataByCondition(@Param("yearID")int yearID, @Param("waterTypeID")int waterTypeID);
	//核算结果统计表弹窗-土地价值量明细查询
	List<WaterTypeandFeaturesTableVo> findLandValueDataByCondition(@Param("yearID")int yearID, @Param("waterTypeID")int waterTypeID);
	
	//核算结果统计表弹窗-林木实物量明细查询
	List<WaterTypeandFeaturesTableVo> findForestDataByCondition(@Param("yearID")int yearID, @Param("waterTypeID")int waterTypeID);
	//核算结果统计表弹窗-林木价值量明细查询
	List<WaterTypeandFeaturesTableVo> findForestValueDataByCondition(@Param("yearID")int yearID, @Param("waterTypeID")int waterTypeID);
	
	//核算结果统计表弹窗-矿产实物量明细查询
	List<WaterTypeandFeaturesTableVo> findMineDataByCondition(@Param("yearID")int yearID, @Param("waterTypeID")int waterTypeID);
	//核算结果统计表弹窗-矿产价值量明细查询
	List<WaterTypeandFeaturesTableVo> findMineValueDataByCondition(@Param("yearID")int yearID, @Param("waterTypeID")int waterTypeID);
	
	//核算结果统计表弹窗-可再生能源实物量明细查询
	List<WaterTypeandFeaturesTableVo> findRenewableDataByCondition(@Param("yearID")int yearID, @Param("waterTypeID")int waterTypeID);
	//核算结果统计表弹窗-可再生能源价值量明细查询
	List<WaterTypeandFeaturesTableVo> findRenewableValueDataByCondition(@Param("yearID")int yearID, @Param("waterTypeID")int waterTypeID);
	
	//核算结果统计表弹窗-大气实物量明细查询
	List<WaterTypeandFeaturesTableVo> findAtmosphereDataByCondition(@Param("yearID")int yearID, @Param("waterTypeID")int waterTypeID);
	//核算结果统计表弹窗-大气价值量明细查询
	List<WaterTypeandFeaturesTableVo> findAtmosphereValueDataByCondition(@Param("yearID")int yearID, @Param("waterTypeID")int waterTypeID);
	
	//核算-统计图-时间过度统计-明细类型查询-水资源
	List<WaterTypeandFeaturesTable> findWaterMxDateSelectByCondition(@Param("waterTypeID")int waterTypeID);
	//核算-统计图-时间过度统计-明细类型数据查询-水资源
	List<WaterTypeandFeaturesTableVo> findWaterMxDateDataByCondition(@Param("waterFeatures")String waterFeatures);
	//核算-统计图-时间过度统计-明细类型查询-土地资源
	List<WaterTypeandFeaturesTable> findLandMxDateSelectByCondition(@Param("waterTypeID")int waterTypeID);
	//核算-统计图-时间过度统计-明细类型数据查询-土地资源
	List<WaterTypeandFeaturesTableVo> findLandMxDateDataByCondition(@Param("waterFeatures")String waterFeatures);
	//核算-统计图-时间过度统计-明细类型查询-林木资源
	List<WaterTypeandFeaturesTable> findForestMxDateSelectByCondition(@Param("waterTypeID")int waterTypeID);
	//核算-统计图-时间过度统计-明细类型数据查询-林木资源
	List<WaterTypeandFeaturesTableVo> findForestMxDateDataByCondition(@Param("waterFeatures")String waterFeatures);
	//核算-统计图-时间过度统计-明细类型查询-矿产资源
	List<WaterTypeandFeaturesTable> findMineMxDateSelectByCondition(@Param("waterTypeID")int waterTypeID);
	//核算-统计图-时间过度统计-明细类型数据查询-矿产资源
	List<WaterTypeandFeaturesTableVo> findMineMxDateDataByCondition(@Param("waterFeatures")String waterFeatures);
	//核算-统计图-时间过度统计-明细类型查询-可再生能源
	List<WaterTypeandFeaturesTable> findRenewableMxDateSelectByCondition(@Param("waterTypeID")int waterTypeID);
	//核算-统计图-时间过度统计-明细类型数据查询-可再生能源
	List<WaterTypeandFeaturesTableVo> findRenewableMxDateDataByCondition(@Param("waterFeatures")String waterFeatures);
	//核算-统计图-时间过度统计-明细类型查询-大气资源
	List<WaterTypeandFeaturesTable> findAtmosphereMxDateSelectByCondition(@Param("waterTypeID")int waterTypeID);
	//核算-统计图-时间过度统计-明细类型数据查询-大气资源
	List<WaterTypeandFeaturesTableVo> findAtmosphereMxDateDataByCondition(@Param("waterFeatures")String waterFeatures);
	
	ShowAreaCheck selectAreaCheck(@Param("yearID")int yearID,@Param("areaID")int areaID);
}