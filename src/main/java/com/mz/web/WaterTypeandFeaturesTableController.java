package com.mz.web;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.mz.vo.ShowAreaCheck;
import com.mz.vo.TypeandFeaturesTableVo;
import com.mz.vo.WaterTypeandFeaturesTableVo;
import com.mz.entity.WaterTypeandFeaturesTable;
import com.mz.entity.YearTable;
import com.mz.service.IWaterTypeandFeaturesTableService;
import com.mz.util.InitBaseData;

/**
 * <p>
 *  前端控制器
 * </p>
 *
 * @author 
 * @since 2018-04-16
 */
@Controller
@RequestMapping("/waterTypeandFeaturesTable")
public class WaterTypeandFeaturesTableController {
	
	@Autowired
	private IWaterTypeandFeaturesTableService iWaterTypeandFeaturesTableService;
	
	@Autowired
	InitBaseData initBaseData;
	
	/* 核算对比展示-水资源-各区县实物量查询  */
	@RequestMapping("findWaterDataAllByCondition")
	@ResponseBody
	public List<WaterTypeandFeaturesTableVo> findWaterDataAllByCondition(String yearID, String waterTypeID){
		List<WaterTypeandFeaturesTableVo> list= iWaterTypeandFeaturesTableService.findWaterDataAllByCondition(Integer.parseInt(yearID), Integer.parseInt(waterTypeID));
		return list;
	}
	
	/* 核算对比展示-水资源-各区县价值量查询 */
	@RequestMapping("findWaterValueDataAllByCondition")
	@ResponseBody
	public List<WaterTypeandFeaturesTableVo> findWaterValueDataAllByCondition(String yearID, String waterTypeID){
		List<WaterTypeandFeaturesTableVo> list= iWaterTypeandFeaturesTableService.findWaterValueDataAllByCondition(Integer.parseInt(yearID), Integer.parseInt(waterTypeID));
		return list;
	}
	
	/* 核算对比展示-土地资源-各区县价值量查询 */
	@RequestMapping("findLandValueDataAllByCondition")
	@ResponseBody
	public List<WaterTypeandFeaturesTableVo> findLandValueDataAllByCondition(String yearID, String waterTypeID){
		List<WaterTypeandFeaturesTableVo> list= iWaterTypeandFeaturesTableService.findLandValueDataAllByCondition(Integer.parseInt(yearID), Integer.parseInt(waterTypeID));
		return list;
	}
	
	/* 核算对比展示-林木资源-各区县价值量查询 */
	@RequestMapping("findForestValueDataAllByCondition")
	@ResponseBody
	public List<WaterTypeandFeaturesTableVo> findForestValueDataAllByCondition(String yearID, String waterTypeID){
		List<WaterTypeandFeaturesTableVo> list= iWaterTypeandFeaturesTableService.findForestValueDataAllByCondition(Integer.parseInt(yearID), Integer.parseInt(waterTypeID));
		return list;
	}
	
	/* 核算对比展示-矿产资源-各区县价值量查询 */
	@RequestMapping("findMineValueDataAllByCondition")
	@ResponseBody
	public List<WaterTypeandFeaturesTableVo> findMineValueDataAllByCondition(String yearID, String waterTypeID){
		List<WaterTypeandFeaturesTableVo> list= iWaterTypeandFeaturesTableService.findMineValueDataAllByCondition(Integer.parseInt(yearID), Integer.parseInt(waterTypeID));
		return list;
	}
	
	/* 核算对比展示-可再生能源-各区县价值量查询 */
	@RequestMapping("findRenewableValueDataAllByCondition")
	@ResponseBody
	public List<WaterTypeandFeaturesTableVo> findRenewableValueDataAllByCondition(String yearID, String waterTypeID){
		List<WaterTypeandFeaturesTableVo> list= iWaterTypeandFeaturesTableService.findRenewableValueDataAllByCondition(Integer.parseInt(yearID), Integer.parseInt(waterTypeID));
		return list;
	}
	
	/* 核算对比展示-大气资源-各区县价值量查询 */
	@RequestMapping("findAtmosphereValueDataAllByCondition")
	@ResponseBody
	public List<WaterTypeandFeaturesTableVo> findAtmosphereValueDataAllByCondition(String yearID, String waterTypeID){
		List<WaterTypeandFeaturesTableVo> list= iWaterTypeandFeaturesTableService.findAtmosphereValueDataAllByCondition(Integer.parseInt(yearID), Integer.parseInt(waterTypeID));
		return list;
	}
	
	/* 核算结果统计表弹窗-价值量总统计-获取有数据的年份 */
	@RequestMapping("findTypeValueYearByCondition")
	@ResponseBody
	public List<YearTable> findTypeValueYearByCondition(){
		List<YearTable> list= iWaterTypeandFeaturesTableService.findTypeValueYearByCondition();
		return list;
	}

	/* 核算结果统计表弹窗-价值量总统计 */
	@RequestMapping("findTypeValueDataByCondition")
	@ResponseBody
	public List<TypeandFeaturesTableVo> findTypeValueDataByCondition(String yearID, String waterTypeID){
		List<TypeandFeaturesTableVo> list= iWaterTypeandFeaturesTableService.findTypeValueDataByCondition(Integer.parseInt(yearID), Integer.parseInt(waterTypeID));
		return list;
	}
	
	/* 水资源-获取有数据的年份 */
	@RequestMapping("findWaterYearByCondition")
	@ResponseBody
	public List<YearTable> findWaterYearByCondition(){
		List<YearTable> list= iWaterTypeandFeaturesTableService.findWaterYearByCondition();
		return list;
	}
	
	/* 土地资源-获取有数据的年份 */
	@RequestMapping("findLandYearByCondition")
	@ResponseBody
	public List<YearTable> findLandYearByCondition(){
		List<YearTable> list= iWaterTypeandFeaturesTableService.findLandYearByCondition();
		return list;
	}
	
	/* 林木资源-获取有数据的年份 */
	@RequestMapping("findForestYearByCondition")
	@ResponseBody
	public List<YearTable> findForestYearByCondition(){
		List<YearTable> list= iWaterTypeandFeaturesTableService.findForestYearByCondition();
		return list;
	}
	
	/* 矿产资源-获取有数据的年份 */
	@RequestMapping("findMineYearByCondition")
	@ResponseBody
	public List<YearTable> findMineYearByCondition(){
		List<YearTable> list= iWaterTypeandFeaturesTableService.findMineYearByCondition();
		return list;
	}
	
	/* 可再生能源-获取有数据的年份 */
	@RequestMapping("findRenewableYearByCondition")
	@ResponseBody
	public List<YearTable> findRenewableYearByCondition(){
		List<YearTable> list= iWaterTypeandFeaturesTableService.findRenewableYearByCondition();
		return list;
	}
	
	/* 大气资源-获取有数据的年份 */
	@RequestMapping("findAtmosphereYearByCondition")
	@ResponseBody
	public List<YearTable> findAtmosphereYearByCondition(){
		List<YearTable> list= iWaterTypeandFeaturesTableService.findAtmosphereYearByCondition();
		return list;
	}
	
	/* 核算结果统计表弹窗-水资源-实物量明细查询 */
	@RequestMapping("findWaterDataByCondition")
	@ResponseBody
	public List<WaterTypeandFeaturesTableVo> findWaterDataByCondition(String yearID, String waterTypeID){
		List<WaterTypeandFeaturesTableVo> list= iWaterTypeandFeaturesTableService.findWaterDataByCondition(Integer.parseInt(yearID), Integer.parseInt(waterTypeID));
		return list;
	}

	/* 核算结果统计表弹窗-水资源-价值量明细查询 */
	@RequestMapping("findWaterValueDataByCondition")
	@ResponseBody
	public List<WaterTypeandFeaturesTableVo> findWaterValueDataByCondition(String yearID, String waterTypeID){
		List<WaterTypeandFeaturesTableVo> list= iWaterTypeandFeaturesTableService.findWaterValueDataByCondition(Integer.parseInt(yearID), Integer.parseInt(waterTypeID));
		return list;
	}
	
	/* 核算结果统计表弹窗-土地资源-实物量明细查询 */
	@RequestMapping("findLandDataByCondition")
	@ResponseBody
	public List<WaterTypeandFeaturesTableVo> findLandDataByCondition(String yearID, String waterTypeID){
		List<WaterTypeandFeaturesTableVo> list= iWaterTypeandFeaturesTableService.findLandDataByCondition(Integer.parseInt(yearID), Integer.parseInt(waterTypeID));
		return list;
	}

	/* 核算结果统计表弹窗-土地资源-价值量明细查询 */
	@RequestMapping("findLandValueDataByCondition")
	@ResponseBody
	public List<WaterTypeandFeaturesTableVo> findLandValueDataByCondition(String yearID, String waterTypeID){
		List<WaterTypeandFeaturesTableVo> list= iWaterTypeandFeaturesTableService.findLandValueDataByCondition(Integer.parseInt(yearID), Integer.parseInt(waterTypeID));
		return list;
	}
	
	/* 核算结果统计表弹窗-林木资源-实物量明细查询 */
	@RequestMapping("findForestDataByCondition")
	@ResponseBody
	public List<WaterTypeandFeaturesTableVo> findForestDataByCondition(String yearID, String waterTypeID){
		List<WaterTypeandFeaturesTableVo> list= iWaterTypeandFeaturesTableService.findForestDataByCondition(Integer.parseInt(yearID), Integer.parseInt(waterTypeID));
		return list;
	}

	/* 核算结果统计表弹窗-林木资源-价值量明细查询 */
	@RequestMapping("findForestValueDataByCondition")
	@ResponseBody
	public List<WaterTypeandFeaturesTableVo> findForestValueDataByCondition(String yearID, String waterTypeID){
		List<WaterTypeandFeaturesTableVo> list= iWaterTypeandFeaturesTableService.findForestValueDataByCondition(Integer.parseInt(yearID), Integer.parseInt(waterTypeID));
		return list;
	}
	
	/* 核算结果统计表弹窗-矿产资源-实物量明细查询 */
	@RequestMapping("findMineDataByCondition")
	@ResponseBody
	public List<WaterTypeandFeaturesTableVo> findMineDataByCondition(String yearID, String waterTypeID){
		List<WaterTypeandFeaturesTableVo> list= iWaterTypeandFeaturesTableService.findMineDataByCondition(Integer.parseInt(yearID), Integer.parseInt(waterTypeID));
		return list;
	}

	/* 核算结果统计表弹窗-矿产资源-价值量明细查询 */
	@RequestMapping("findMineValueDataByCondition")
	@ResponseBody
	public List<WaterTypeandFeaturesTableVo> findMineValueDataByCondition(String yearID, String waterTypeID){
		List<WaterTypeandFeaturesTableVo> list= iWaterTypeandFeaturesTableService.findMineValueDataByCondition(Integer.parseInt(yearID), Integer.parseInt(waterTypeID));
		return list;
	}
	
	/* 核算结果统计表弹窗-可再生能源-实物量明细查询 */
	@RequestMapping("findRenewableDataByCondition")
	@ResponseBody
	public List<WaterTypeandFeaturesTableVo> findRenewableDataByCondition(String yearID, String waterTypeID){
		List<WaterTypeandFeaturesTableVo> list= iWaterTypeandFeaturesTableService.findRenewableDataByCondition(Integer.parseInt(yearID), Integer.parseInt(waterTypeID));
		return list;
	}

	/* 核算结果统计表弹窗-可再生能源-价值量明细查询 */
	@RequestMapping("findRenewableValueDataByCondition")
	@ResponseBody
	public List<WaterTypeandFeaturesTableVo> findRenewableValueDataByCondition(String yearID, String waterTypeID){
		List<WaterTypeandFeaturesTableVo> list= iWaterTypeandFeaturesTableService.findRenewableValueDataByCondition(Integer.parseInt(yearID), Integer.parseInt(waterTypeID));
		return list;
	}
	
	/* 核算结果统计表弹窗-大气资源-实物量明细查询 */
	@RequestMapping("findAtmosphereDataByCondition")
	@ResponseBody
	public List<WaterTypeandFeaturesTableVo> findAtmosphereDataByCondition(String yearID, String waterTypeID){
		List<WaterTypeandFeaturesTableVo> list= iWaterTypeandFeaturesTableService.findAtmosphereDataByCondition(Integer.parseInt(yearID), Integer.parseInt(waterTypeID));
		return list;
	}

	/* 核算结果统计表弹窗-大气资源-价值量明细查询 */
	@RequestMapping("findAtmosphereValueDataByCondition")
	@ResponseBody
	public List<WaterTypeandFeaturesTableVo> findAtmosphereValueDataByCondition(String yearID, String waterTypeID){
		List<WaterTypeandFeaturesTableVo> list= iWaterTypeandFeaturesTableService.findAtmosphereValueDataByCondition(Integer.parseInt(yearID), Integer.parseInt(waterTypeID));
		return list;
	}
	
	/* 核算-统计图-时间过度统计-明细类型查询-水资源*/
	@RequestMapping("findWaterMxDateSelectByCondition")
	@ResponseBody
	public List<WaterTypeandFeaturesTable> findWaterMxDateSelectByCondition(String waterTypeID){
		List<WaterTypeandFeaturesTable> list= iWaterTypeandFeaturesTableService.findWaterMxDateSelectByCondition(Integer.parseInt(waterTypeID));
		return list;
	}
	/* 核算-统计图-时间过度统计-明细类型查询-土地资源*/
	@RequestMapping("findLandMxDateSelectByCondition")
	@ResponseBody
	public List<WaterTypeandFeaturesTable> findLandMxDateSelectByCondition(String waterTypeID){
		List<WaterTypeandFeaturesTable> list= iWaterTypeandFeaturesTableService.findLandMxDateSelectByCondition(Integer.parseInt(waterTypeID));
		return list;
	}
	/* 核算-统计图-时间过度统计-明细类型查询-林木资源*/
	@RequestMapping("findForestMxDateSelectByCondition")
	@ResponseBody
	public List<WaterTypeandFeaturesTable> findForestMxDateSelectByCondition(String waterTypeID){
		List<WaterTypeandFeaturesTable> list= iWaterTypeandFeaturesTableService.findForestMxDateSelectByCondition(Integer.parseInt(waterTypeID));
		return list;
	}
	/* 核算-统计图-时间过度统计-明细类型查询-矿产资源*/
	@RequestMapping("findMineMxDateSelectByCondition")
	@ResponseBody
	public List<WaterTypeandFeaturesTable> findMineMxDateSelectByCondition(String waterTypeID){
		List<WaterTypeandFeaturesTable> list= iWaterTypeandFeaturesTableService.findMineMxDateSelectByCondition(Integer.parseInt(waterTypeID));
		return list;
	}
	/* 核算-统计图-时间过度统计-明细类型查询-可再生能源*/
	@RequestMapping("findRenewableMxDateSelectByCondition")
	@ResponseBody
	public List<WaterTypeandFeaturesTable> findRenewableMxDateSelectByCondition(String waterTypeID){
		List<WaterTypeandFeaturesTable> list= iWaterTypeandFeaturesTableService.findRenewableMxDateSelectByCondition(Integer.parseInt(waterTypeID));
		return list;
	}
	/* 核算-统计图-时间过度统计-明细类型查询-大气资源*/
	@RequestMapping("findAtmosphereMxDateSelectByCondition")
	@ResponseBody
	public List<WaterTypeandFeaturesTable> findAtmosphereMxDateSelectByCondition(String waterTypeID){
		List<WaterTypeandFeaturesTable> list= iWaterTypeandFeaturesTableService.findAtmosphereMxDateSelectByCondition(Integer.parseInt(waterTypeID));
		return list;
	}
	
	/* 核算-统计图-时间过度统计-明细类型数据查询-水资源*/
	@RequestMapping("findWaterMxDateDataByCondition")
	@ResponseBody
	public List<WaterTypeandFeaturesTableVo> findWaterMxDateDataByCondition(String waterFeatures){
		List<WaterTypeandFeaturesTableVo> list= iWaterTypeandFeaturesTableService.findWaterMxDateDataByCondition(waterFeatures);
		return list;
	}
	/* 核算-统计图-时间过度统计-明细类型数据查询-土地资源*/
	@RequestMapping("findLandMxDateDataByCondition")
	@ResponseBody
	public List<WaterTypeandFeaturesTableVo> findLandMxDateDataByCondition(String waterFeatures){
		List<WaterTypeandFeaturesTableVo> list= iWaterTypeandFeaturesTableService.findLandMxDateDataByCondition(waterFeatures);
		return list;
	}
	/* 核算-统计图-时间过度统计-明细类型数据查询-林木资源*/
	@RequestMapping("findForestMxDateDataByCondition")
	@ResponseBody
	public List<WaterTypeandFeaturesTableVo> findForestMxDateDataByCondition(String waterFeatures){
		List<WaterTypeandFeaturesTableVo> list= iWaterTypeandFeaturesTableService.findForestMxDateDataByCondition(waterFeatures);
		return list;
	}
	/* 核算-统计图-时间过度统计-明细类型数据查询-矿产资源*/
	@RequestMapping("findMineMxDateDataByCondition")
	@ResponseBody
	public List<WaterTypeandFeaturesTableVo> findMineMxDateDataByCondition(String waterFeatures){
		List<WaterTypeandFeaturesTableVo> list= iWaterTypeandFeaturesTableService.findMineMxDateDataByCondition(waterFeatures);
		return list;
	}
	/* 核算-统计图-时间过度统计-明细类型数据查询-可再生能源*/
	@RequestMapping("findRenewableMxDateDataByCondition")
	@ResponseBody
	public List<WaterTypeandFeaturesTableVo> findRenewableMxDateDataByCondition(String waterFeatures){
		List<WaterTypeandFeaturesTableVo> list= iWaterTypeandFeaturesTableService.findRenewableMxDateDataByCondition(waterFeatures);
		return list;
	}
	/* 核算-统计图-时间过度统计-明细类型数据查询-大气资源*/
	@RequestMapping("findAtmosphereMxDateDataByCondition")
	@ResponseBody
	public List<WaterTypeandFeaturesTableVo> findAtmosphereMxDateDataByCondition(String waterFeatures){
		List<WaterTypeandFeaturesTableVo> list= iWaterTypeandFeaturesTableService.findAtmosphereMxDateDataByCondition(waterFeatures);
		return list;
	}
	
	
	@RequestMapping("selectAreaCheck")
	@ResponseBody
	public ShowAreaCheck selectAreaCheck(Integer yearID,String  area){
		Map<Object, Integer> map=initBaseData.getValueKey("area");
		Integer areaID=initBaseData.getValueKey("area").get(area);
		return iWaterTypeandFeaturesTableService.selectAreaCheck(yearID, areaID);
	}
	
}
