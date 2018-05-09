package com.mz.mapper;

import com.mz.entity.AtmospherePhyQuantityTable;
import com.mz.vo.ShowAtmoshpherePhyQuantity;
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
public interface AtmospherePhyQuantityTableMapper extends BaseMapper<AtmospherePhyQuantityTable> {
	/**
	 * 批量新增excel
	 * @param atmosphere
	 */
	void insertPhyQuantityExcel(@Param("list")List<AtmospherePhyQuantityTable> atmosphere);
	
	/**
	 * 分页
	 * @param begin
	 * @param size
	 * @return
	 */
	List<ShowAtmoshpherePhyQuantity> selectPhyQuantityLimit(@Param("begin")int begin,@Param("size")int size);

	/**
	 * 修改实物量
	 * @param mpqt
	 */
	int updatePhyQuantity(@Param("atmosphere")AtmospherePhyQuantityTable atmosphere);

	/**
	 * 根据id删除
	 * @param id
	 */
	int deleteByID(@Param("id")int id);

	/**
	 * 新增数据
	 * @param mpqt
	 */
	int insertPhyQuantity(@Param("atmosphere")AtmospherePhyQuantityTable atmosphere);

	/**
	 * 根据id查询
	 * @param id
	 * @return
	 */
	ShowAtmoshpherePhyQuantity selectByID(@Param("id")int id);
}