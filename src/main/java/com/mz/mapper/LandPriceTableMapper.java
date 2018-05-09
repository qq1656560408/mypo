package com.mz.mapper;

import com.mz.entity.LandPriceTable;
import com.mz.vo.ShowLandPrice;
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
public interface LandPriceTableMapper extends BaseMapper<LandPriceTable> {
	/**
	 * excel 导入
	 * @param list
	 */
	void insertByExcle(@Param("list") List<LandPriceTable> list);

	int insertPriceTable(@Param("land")LandPriceTable land);
	/**
	 * 价格数据
	 * @param begin
	 * @param size
	 * @return
	 */
	List<ShowLandPrice> selectPriceTableLimit(@Param("begin") int begin, @Param("size") int size);


	/**
	 * 删除
	 * @param landPriceID
	 */
	int deleteByID(@Param("landPriceID") int landPriceID);

	/**
	 * 通过id查询
	 * @param landPriceID
	 * @return
	 */
	ShowLandPrice selectByID(@Param("landPriceID") int landPriceID);

	/**
	 * 
	 * @param land
	 */
	int updatePrice(@Param("land") LandPriceTable land);
}