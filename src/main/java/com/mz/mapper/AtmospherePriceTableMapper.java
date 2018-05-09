package com.mz.mapper;

import com.mz.entity.AtmospherePriceTable;
import com.mz.vo.ShowAtmoshoherePrice;
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
public interface AtmospherePriceTableMapper extends BaseMapper<AtmospherePriceTable> {
	
	/**
	 * excel 导入
	 * @param list
	 */
	void insertByExcle(@Param("list") List<AtmospherePriceTable> list);

	int insertPriceTable(@Param("atmosphere")AtmospherePriceTable atmosphere);
	/**
	 * 价格数据
	 * @param begin
	 * @param size
	 * @return
	 */
	List<ShowAtmoshoherePrice> selectPriceTableLimit(@Param("begin") int begin, @Param("size") int size);


	/**
	 * 删除
	 * @param atmospherePriceID
	 */
	int deleteByID(@Param("atmospherePriceID") int atmospherePriceID);

	/**
	 * 通过id查询
	 * @param atmospherePriceID
	 * @return
	 */
	ShowAtmoshoherePrice selectByID(@Param("atmospherePriceID") int atmospherePriceID);

	/**
	 * 
	 * @param atmosphere
	 */
	int updatePrice(@Param("atmosphere") AtmospherePriceTable atmosphere);
}