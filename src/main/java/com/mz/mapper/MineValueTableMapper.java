package com.mz.mapper;

import com.mz.entity.MineValueTable;
import java.util.List;
import org.apache.ibatis.annotations.Param;
import com.baomidou.mybatisplus.mapper.BaseMapper;

/**
 * <p>
  *  Mapper 接口
 * </p>
 *
 * @author 
 * @since 2018-04-19
 */
public interface MineValueTableMapper extends BaseMapper<MineValueTable> {

	void insertValue(@Param("list")List<MineValueTable> list);
}