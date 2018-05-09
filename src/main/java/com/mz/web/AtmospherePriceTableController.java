package com.mz.web;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;
import com.mz.entity.AtmospherePriceTable;
import com.mz.entity.WaterTypeandFeaturesTable;
import com.mz.service.IAtmospherePriceTableService;
import com.mz.util.LayuiResponseData;
import com.mz.vo.ShowAtmoshoherePrice;
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
@RequestMapping("/atmospherePriceTable")
public class AtmospherePriceTableController extends BaseControl{

	@Autowired
	IAtmospherePriceTableService atmospherePriceTableService;

	@RequestMapping("excelImprot")
	@ResponseBody
	public Object excelImprot(MultipartFile excelFile) {
		return atmospherePriceTableService.insertExcelImport(excelFile);
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
		int count = atmospherePriceTableService.selectCount(null);
		List<ShowAtmoshoherePrice> list = atmospherePriceTableService.selectPriceTableLimit(begin, limit);
		return new LayuiResponseData(count, list);
	}

	@RequestMapping("bingInsertBaseData")
	public ModelAndView insertBaseData() {
		return loadBase("DataManage/atmosphereManage/jiaGe/insertAtmospherePrice");
	}

	@RequestMapping("bingUpdateBaseData")
	public ModelAndView updateBaseData(int id) {
		ShowAtmoshoherePrice swp = atmospherePriceTableService.selectByID(id);
		ModelAndView modelAndView = loadBase("DataManage/atmosphereManage/jiaGe/updateAtmospherePrice");
		modelAndView.addObject("swp", swp);
		return modelAndView;
	}

	@RequestMapping("insertPrice")
	@ResponseBody
	public Object insertPrice(Integer year,WaterTypeandFeaturesTable water,AtmospherePriceTable atmosphere) {
		int yearID = initBaseData.getValueKey("year").get(year);
		water.setYearID(yearID);
		int i = atmospherePriceTableService.insertPriceTable(water,atmosphere);
		return isSuccess(i);
	}

	@RequestMapping("updatePrice")
	@ResponseBody
	public Object updatePrice(AtmospherePriceTable atmosphere) {
		Boolean b = atmospherePriceTableService.updatePrice(atmosphere);
		return "{\"success\":" + b + "}";

	}

	@RequestMapping("deletePrice")
	@ResponseBody
	public Object deletePrice(int id) {
		Boolean b = atmospherePriceTableService.deleteByID(id);
		return "{\"success\":" + b + "}";
	}
}
