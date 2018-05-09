package com.mz.mapper;

import com.mz.entity.WaterPriceTable;
import com.mz.vo.ShowWaterPrice;

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
public interface WaterPriceTableMapper extends BaseMapper<WaterPriceTable> {

	void insertByExcle(@Param("list")List<WaterPriceTable> list);
	
	List<ShowWaterPrice> selectPriceTableLimit(@Param("begin") int begin,@Param("size")int size);

	/**
	 * 
	 * @param waterTypeAndFeaturesID
	 * @return
	 */
	WaterPriceTable selectWaterPrice(@Param("waterTypeAndFeaturesID")int waterTypeAndFeaturesID);

	int deleteByID(@Param("waterPriceID") int waterPriceID);
	
	ShowWaterPrice selectByID(@Param("waterPriceID") int waterPriceID);

	int updatePrice(@Param("wpt")WaterPriceTable wpt);

}