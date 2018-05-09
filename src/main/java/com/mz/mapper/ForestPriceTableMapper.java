package com.mz.mapper;

import com.mz.entity.ForestPriceTable;
import com.mz.vo.ShowForestPrice;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.baomidou.mybatisplus.mapper.BaseMapper;

/**
 * <p>
  *  Mapper 接口
 * </p>
 *
 * @author 
 * @since 2018-04-21
 */
public interface ForestPriceTableMapper extends BaseMapper<ForestPriceTable> {

	/**
	 * excel 导入
	 * @param list
	 */
	void insertByExcle(@Param("list") List<ForestPriceTable> list);

	int insertPriceTable(@Param("forest")ForestPriceTable forest);
	/**
	 * 价格数据
	 * @param begin
	 * @param size
	 * @return
	 */
	List<ShowForestPrice> selectPriceTableLimit(@Param("begin") int begin, @Param("size") int size);


	/**
	 * 删除
	 * @param forestPriceID
	 */
	int deleteByID(@Param("forestPriceID") int forestPriceID);

	/**
	 * 通过id查询
	 * @param forestPriceID
	 * @return
	 */
	ShowForestPrice selectByID(@Param("forestPriceID") int forestPriceID);

	/**
	 * 
	 * @param forest
	 */
	int updatePrice(@Param("forest") ForestPriceTable forest);
}