package com.mz.mapper;

import com.mz.entity.WaterPhyQuantityTable;
import com.mz.entity.WaterPriceTable;
import com.mz.vo.ShowPhyQuantity;

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
public interface WaterPhyQuantityTableMapper extends BaseMapper<WaterPhyQuantityTable> {

	/**
	 * 
	 * @param waterTypeAndFeaturesID  类别功能id
	 * @return
	 */
	WaterPhyQuantityTable selectPhyQuantity(@Param("waterTypeAndFeaturesID")int waterTypeAndFeaturesID);

	/**
	 * excel批量插入
	 * @param list
	 */
	void insertPhyQuantityExcel(@Param("list") List<WaterPhyQuantityTable> list);


	List<ShowPhyQuantity> selectPhyQuantityLimit(@Param("begin")int begin,@Param("size")int size);

	int updatePhyQuantity(@Param("wpqt")WaterPhyQuantityTable wpqt);

	int deleteByID(@Param("id")int id);

	void insertPhyQuantity(@Param("wpqt")WaterPhyQuantityTable wpqt);

	ShowPhyQuantity selectByID(@Param("id")int id);
	
}