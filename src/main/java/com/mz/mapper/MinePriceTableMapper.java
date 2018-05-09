package com.mz.mapper;

import com.mz.entity.MinePriceTable;
import com.mz.vo.ShowMinePrice;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.baomidou.mybatisplus.mapper.BaseMapper;

/**
 * <p>
 * Mapper 接口
 * </p>
 *
 * @author
 * @since 2018-04-19
 */
public interface MinePriceTableMapper extends BaseMapper<MinePriceTable> {
	
	/**
	 * excel 导入
	 * @param list
	 */
	void insertByExcle(@Param("list") List<MinePriceTable> list);

	void insertPriceTable(@Param("mine")MinePriceTable mine);
	/**
	 * 价格数据
	 * @param begin
	 * @param size
	 * @return
	 */
	List<ShowMinePrice> selectPriceTableLimit(@Param("begin") int begin, @Param("size") int size);


	/**
	 * 删除
	 * @param minePriceID
	 */
	int deleteByID(@Param("minePriceID") int minePriceID);

	/**
	 * 通过id查询
	 * @param minePriceID
	 * @return
	 */
	ShowMinePrice selectByID(@Param("minePriceID") int minePriceID);

	/**
	 * 
	 * @param mine
	 */
	int updatePrice(@Param("mine") MinePriceTable mine);
}