package com.mz.service.impl;

import com.mz.entity.WaterTypeandFeaturesTable;
import com.mz.entity.YearTable;
import com.mz.mapper.WaterTypeandFeaturesTableMapper;
import com.mz.service.IWaterTypeandFeaturesTableService;
import com.mz.vo.ShowAreaCheck;
import com.mz.vo.TypeandFeaturesTableVo;
import com.mz.vo.WaterTypeandFeaturesTableVo;
import com.baomidou.mybatisplus.service.impl.ServiceImpl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * <p>
 *  服务实现类
 * </p>
 *
 * @author 
 * @since 2018-04-16
 */
@Service
public class WaterTypeandFeaturesTableServiceImpl extends ServiceImpl<WaterTypeandFeaturesTableMapper, WaterTypeandFeaturesTable> implements IWaterTypeandFeaturesTableService {

	@Autowired
	WaterTypeandFeaturesTableMapper waterTypeandFeaturesTableMapper;
	
	
	@Override
	public WaterTypeandFeaturesTable existDataNoInser(WaterTypeandFeaturesTable wtft) {
	
		WaterTypeandFeaturesTable waterTypeandFeaturesTable=waterTypeandFeaturesTableMapper.selectDataIsExist(wtft);
		if(waterTypeandFeaturesTable==null||waterTypeandFeaturesTable.getWaterTypeAndFeaturesID()<=0){
			//不存在，新增
			waterTypeandFeaturesTableMapper.insertTypeAndFeatures(wtft);
			return wtft;
		}else{
			return waterTypeandFeaturesTable;
		}
		
	}


	//水资源-多条件-核算查询
	@Override
	public List<WaterTypeandFeaturesTableVo> findWaterDataByCondition(int yearID,int waterTypeID) {
		return waterTypeandFeaturesTableMapper.findWaterDataByCondition(yearID, waterTypeID);
	}


	@Override
	public List<WaterTypeandFeaturesTableVo> findWaterValueDataByCondition(int yearID, int waterTypeID) {
		return waterTypeandFeaturesTableMapper.findWaterValueDataByCondition(yearID, waterTypeID);
	}


	@Override
	public List<WaterTypeandFeaturesTableVo> findWaterDataAllByCondition(int yearID, int waterTypeID) {
		return waterTypeandFeaturesTableMapper.findWaterDataAllByCondition(yearID, waterTypeID);
	}


	@Override
	public List<WaterTypeandFeaturesTableVo> findWaterValueDataAllByCondition(int yearID, int waterTypeID) {
		return waterTypeandFeaturesTableMapper.findWaterValueDataAllByCondition(yearID, waterTypeID);
	}


	@Override
	public ShowAreaCheck selectAreaCheck(int yearID, int areaID) {
		return waterTypeandFeaturesTableMapper.selectAreaCheck(yearID, areaID);
	}


	@Override
	public List<TypeandFeaturesTableVo> findTypeValueDataByCondition(int yearID, int waterTypeID) {
		return waterTypeandFeaturesTableMapper.findTypeValueDataByCondition(yearID, waterTypeID);
	}


	@Override
	public List<YearTable> findWaterYearByCondition() {
		return waterTypeandFeaturesTableMapper.findWaterYearByCondition();
	}


	@Override
	public List<YearTable> findTypeValueYearByCondition() {
		return waterTypeandFeaturesTableMapper.findTypeValueYearByCondition();
	}


	@Override
	public List<WaterTypeandFeaturesTableVo> findLandDataByCondition(int yearID, int waterTypeID) {
		return waterTypeandFeaturesTableMapper.findLandDataByCondition(yearID, waterTypeID);
	}


	@Override
	public List<WaterTypeandFeaturesTableVo> findLandValueDataByCondition(int yearID, int waterTypeID) {
		return waterTypeandFeaturesTableMapper.findLandValueDataByCondition(yearID, waterTypeID);
	}


	@Override
	public List<WaterTypeandFeaturesTableVo> findForestDataByCondition(int yearID, int waterTypeID) {
		return waterTypeandFeaturesTableMapper.findForestDataByCondition(yearID, waterTypeID);
	}


	@Override
	public List<WaterTypeandFeaturesTableVo> findForestValueDataByCondition(int yearID, int waterTypeID) {
		return waterTypeandFeaturesTableMapper.findForestValueDataByCondition(yearID, waterTypeID);
	}


	@Override
	public List<WaterTypeandFeaturesTableVo> findMineDataByCondition(int yearID, int waterTypeID) {
		return waterTypeandFeaturesTableMapper.findMineDataByCondition(yearID, waterTypeID);
	}


	@Override
	public List<WaterTypeandFeaturesTableVo> findMineValueDataByCondition(int yearID, int waterTypeID) {
		return waterTypeandFeaturesTableMapper.findMineValueDataByCondition(yearID, waterTypeID);
	}


	@Override
	public List<WaterTypeandFeaturesTableVo> findRenewableDataByCondition(int yearID, int waterTypeID) {
		return waterTypeandFeaturesTableMapper.findRenewableDataByCondition(yearID, waterTypeID);
	}


	@Override
	public List<WaterTypeandFeaturesTableVo> findRenewableValueDataByCondition(int yearID, int waterTypeID) {
		return waterTypeandFeaturesTableMapper.findRenewableValueDataByCondition(yearID, waterTypeID);
	}


	@Override
	public List<WaterTypeandFeaturesTableVo> findAtmosphereDataByCondition(int yearID, int waterTypeID) {
		return waterTypeandFeaturesTableMapper.findAtmosphereDataByCondition(yearID, waterTypeID);
	}


	@Override
	public List<WaterTypeandFeaturesTableVo> findAtmosphereValueDataByCondition(int yearID, int waterTypeID) {
		return waterTypeandFeaturesTableMapper.findAtmosphereValueDataByCondition(yearID, waterTypeID);
	}


	@Override
	public List<WaterTypeandFeaturesTableVo> findLandValueDataAllByCondition(int yearID, int waterTypeID) {
		return waterTypeandFeaturesTableMapper.findLandValueDataAllByCondition(yearID, waterTypeID);
	}


	@Override
	public List<WaterTypeandFeaturesTableVo> findForestValueDataAllByCondition(int yearID, int waterTypeID) {
		return waterTypeandFeaturesTableMapper.findForestValueDataAllByCondition(yearID, waterTypeID);
	}


	@Override
	public List<WaterTypeandFeaturesTableVo> findMineValueDataAllByCondition(int yearID, int waterTypeID) {
		return waterTypeandFeaturesTableMapper.findMineValueDataAllByCondition(yearID, waterTypeID);
	}


	@Override
	public List<WaterTypeandFeaturesTableVo> findRenewableValueDataAllByCondition(int yearID, int waterTypeID) {
		return waterTypeandFeaturesTableMapper.findRenewableValueDataAllByCondition(yearID, waterTypeID);
	}


	@Override
	public List<WaterTypeandFeaturesTableVo> findAtmosphereValueDataAllByCondition(int yearID, int waterTypeID) {
		return waterTypeandFeaturesTableMapper.findAtmosphereValueDataAllByCondition(yearID, waterTypeID);
	}


	@Override
	public List<YearTable> findLandYearByCondition() {
		return waterTypeandFeaturesTableMapper.findLandYearByCondition();
	}


	@Override
	public List<YearTable> findForestYearByCondition() {
		return waterTypeandFeaturesTableMapper.findForestYearByCondition();
	}


	@Override
	public List<YearTable> findMineYearByCondition() {
		return waterTypeandFeaturesTableMapper.findMineYearByCondition();
	}


	@Override
	public List<YearTable> findRenewableYearByCondition() {
		return waterTypeandFeaturesTableMapper.findRenewableYearByCondition();
	}


	@Override
	public List<YearTable> findAtmosphereYearByCondition() {
		return waterTypeandFeaturesTableMapper.findAtmosphereYearByCondition();
	}


	@Override
	public List<WaterTypeandFeaturesTable> findWaterMxDateSelectByCondition(int waterTypeID) {
		return waterTypeandFeaturesTableMapper.findWaterMxDateSelectByCondition(waterTypeID);
	}


	@Override
	public List<WaterTypeandFeaturesTableVo> findWaterMxDateDataByCondition(String waterFeatures) {
		return waterTypeandFeaturesTableMapper.findWaterMxDateDataByCondition(waterFeatures);
	}


	@Override
	public List<WaterTypeandFeaturesTable> findLandMxDateSelectByCondition(int waterTypeID) {
		return waterTypeandFeaturesTableMapper.findLandMxDateSelectByCondition(waterTypeID);
	}


	@Override
	public List<WaterTypeandFeaturesTableVo> findLandMxDateDataByCondition(String waterFeatures) {
		return waterTypeandFeaturesTableMapper.findLandMxDateDataByCondition(waterFeatures);
	}


	@Override
	public List<WaterTypeandFeaturesTable> findForestMxDateSelectByCondition(int waterTypeID) {
		return waterTypeandFeaturesTableMapper.findForestMxDateSelectByCondition(waterTypeID);
	}


	@Override
	public List<WaterTypeandFeaturesTableVo> findForestMxDateDataByCondition(String waterFeatures) {
		return waterTypeandFeaturesTableMapper.findForestMxDateDataByCondition(waterFeatures);
	}


	@Override
	public List<WaterTypeandFeaturesTable> findMineMxDateSelectByCondition(int waterTypeID) {
		return waterTypeandFeaturesTableMapper.findMineMxDateSelectByCondition(waterTypeID);
	}


	@Override
	public List<WaterTypeandFeaturesTableVo> findMineMxDateDataByCondition(String waterFeatures) {
		return waterTypeandFeaturesTableMapper.findMineMxDateDataByCondition(waterFeatures);
	}


	@Override
	public List<WaterTypeandFeaturesTable> findRenewableMxDateSelectByCondition(int waterTypeID) {
		return waterTypeandFeaturesTableMapper.findRenewableMxDateSelectByCondition(waterTypeID);
	}


	@Override
	public List<WaterTypeandFeaturesTableVo> findRenewableMxDateDataByCondition(String waterFeatures) {
		return waterTypeandFeaturesTableMapper.findRenewableMxDateDataByCondition(waterFeatures);
	}


	@Override
	public List<WaterTypeandFeaturesTable> findAtmosphereMxDateSelectByCondition(int waterTypeID) {
		return waterTypeandFeaturesTableMapper.findAtmosphereMxDateSelectByCondition(waterTypeID);
	}


	@Override
	public List<WaterTypeandFeaturesTableVo> findAtmosphereMxDateDataByCondition(String waterFeatures) {
		return waterTypeandFeaturesTableMapper.findAtmosphereMxDateDataByCondition(waterFeatures);
	}
	
}
