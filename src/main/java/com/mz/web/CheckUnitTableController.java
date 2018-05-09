package com.mz.web;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.mz.entity.CheckUnitTable;
import com.mz.service.ICheckUnitTableService;

/**
 * <p>
 *  前端控制器
 * </p>
 *
 * @author 
 * @since 2018-04-16
 */
@Controller
@RequestMapping("/checkUnitTable")
public class CheckUnitTableController {
	@Autowired
	private ICheckUnitTableService checkUnitTableService;
	
	/*查询全部考核单位*/
	@RequestMapping("findUnit")
	@ResponseBody
	public List<CheckUnitTable> FindUnit(){
		List<CheckUnitTable> list= checkUnitTableService.selectList(null);
		return list;
	}
	
	
}
