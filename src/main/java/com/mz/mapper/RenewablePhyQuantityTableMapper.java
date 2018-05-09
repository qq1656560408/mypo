package com.mz.mapper;

import com.mz.entity.RenewablePhyQuantityTable;
import com.mz.vo.ShowRenewablePhyQuantity;
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
public interface RenewablePhyQuantityTableMapper extends BaseMapper<RenewablePhyQuantityTable> {
	/**
	 * 批量新增excel
	 * @param renewable
	 */
	void insertPhyQuantityExcel(@Param("list")List<RenewablePhyQuantityTable> renewable);
	
	/**
	 * 分页
	 * @param begin
	 * @param size
	 * @return
	 */
	List<ShowRenewablePhyQuantity> selectPhyQuantityLimit(@Param("begin")int begin,@Param("size")int size);

	/**
	 * 修改实物量
	 * @param mpqt
	 */
	int updatePhyQuantity(@Param("renewable")RenewablePhyQuantityTable renewable);

	/**
	 * 根据id删除
	 * @param id
	 */
	int deleteByID(@Param("id")int id);

	/**
	 * 新增数据
	 * @param mpqt
	 */
	int insertPhyQuantity(@Param("renewable")RenewablePhyQuantityTable renewable);

	/**
	 * 根据id查询
	 * @param id
	 * @return
	 */
	ShowRenewablePhyQuantity selectByID(@Param("id")int id);
}