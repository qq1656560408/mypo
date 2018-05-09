package com.mz.web;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.mz.entity.CheckUnitMaterialTemTable;
import com.mz.service.ICheckUnitMaterialTemTableService;

/**
 * <p>
 *  前端控制器
 * </p>
 *
 * @author 
 * @since 2018-04-16
 */
@Controller
@RequestMapping("/checkUnitMaterialTemTable")
public class CheckUnitMaterialTemTableController {
	@Autowired
	private ICheckUnitMaterialTemTableService checkUnitMaterialTemTableService;
	
	/*查询到对应的项目指标和要求*/
	@RequestMapping("findMaterial")
	@ResponseBody
	public List<CheckUnitMaterialTemTable> findMaterial(){
		List<CheckUnitMaterialTemTable> list=checkUnitMaterialTemTableService.selectUnitMaterial();
		return list;
	}
}
