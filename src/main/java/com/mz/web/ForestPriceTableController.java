package com.mz.web;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;

import com.mz.entity.ForestPriceTable;
import com.mz.entity.WaterTypeandFeaturesTable;
import com.mz.service.IForestPriceTableService;
import com.mz.util.LayuiResponseData;
import com.mz.vo.ShowForestPrice;
import com.mz.web.base.BaseControl;

/**
 * <p>
 *  前端控制器
 * </p>
 *
 * @author 
 * @since 2018-04-21
 */
@Controller
@RequestMapping("/forestPriceTable")
public class ForestPriceTableController extends BaseControl{

	@Autowired
	IForestPriceTableService forestPriceTableService;

	@RequestMapping("excelImprot")
	@ResponseBody
	public Object excelImprot(MultipartFile excelFile) {
		return forestPriceTableService.insertExcelImport(excelFile);
	}

	@RequestMapping("selectPriceTable")
	@ResponseBody
	public Object selectPriceTable(Integer page, Integer limit) {
		if (page == null) {
			page = 1;
		}
		if (limit == null) {
			limit = 10;
		}
		int begin = (page - 1) * limit;
		int count = forestPriceTableService.selectCount(null);
		List<ShowForestPrice> list = forestPriceTableService.selectPriceTableLimit(begin, limit);
		return new LayuiResponseData(count, list);
	}

	@RequestMapping("bingInsertBaseData")
	public ModelAndView insertBaseData() {
		return loadBase("DataManage/ForestManage/jiaGe/insertForestPrice");
	}

	@RequestMapping("bingUpdateBaseData")
	public ModelAndView updateBaseData(int id) {
		ShowForestPrice swp = forestPriceTableService.selectByID(id);
		ModelAndView modelAndView = loadBase("DataManage/ForestManage/jiaGe/updateForestPrice");
		modelAndView.addObject("swp", swp);
		return modelAndView;
	}

	@RequestMapping("insertPrice")
	@ResponseBody
	public Object insertPrice(Integer year,WaterTypeandFeaturesTable water,ForestPriceTable mpt) {
		if(year!=null&&year.equals("")){
			return isSuccess(0);
		}
		Map<Object, Integer>  map=initBaseData.getValueKey("year");
		int yearID =map.get(year);
		water.setYearID(yearID);
		mpt.setCoefficient(1.0);
		int i = forestPriceTableService.insertPriceTable(water,mpt);
		return isSuccess(i);
	}

	@RequestMapping("updatePrice")
	@ResponseBody
	public Object updatePrice(ForestPriceTable mpt) {
		mpt.setCoefficient(1.0);
		Boolean b = forestPriceTableService.updatePrice(mpt);
		return "{\"success\":" + b + "}";

	}

	@RequestMapping("deletePrice")
	@ResponseBody
	public Object deletePrice(int id) {
		Boolean b = forestPriceTableService.deleteByID(id);
		return "{\"success\":" + b + "}";
	}
}
