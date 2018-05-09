package com.mz.mapper;

import com.mz.entity.RenewablePriceTable;
import com.mz.vo.ShowRenewablePrice;
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
public interface RenewablePriceTableMapper extends BaseMapper<RenewablePriceTable> {

	/**
	 * excel 导入
	 * @param list
	 */
	void insertByExcle(@Param("list") List<RenewablePriceTable> list);

	int insertPriceTable(@Param("renewable")RenewablePriceTable renewable);
	/**
	 * 价格数据
	 * @param begin
	 * @param size
	 * @return
	 */
	List<ShowRenewablePrice> selectPriceTableLimit(@Param("begin") int begin, @Param("size") int size);


	/**
	 * 删除
	 * @param renewablePriceID
	 */
	int deleteByID(@Param("renewablePriceID") int renewablePriceID);

	/**
	 * 通过id查询
	 * @param renewablePriceID
	 * @return
	 */
	ShowRenewablePrice selectByID(@Param("renewablePriceID") int renewablePriceID);

	/**
	 * 
	 * @param renewable
	 */
	int updatePrice(@Param("renewable") RenewablePriceTable renewable);
}