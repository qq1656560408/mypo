package com.mz.util;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import com.sun.media.jai.codec.ImageCodec;
import com.sun.media.jai.codec.ImageDecoder;
import com.sun.media.jai.codec.ImageEncoder;

public class TifConvert {

	/**
	 * tif转png
	 * @param is
	 * @return
	 */
	public static InputStream tifToPng(InputStream is) {
		ByteArrayOutputStream out = null;
		try {
			out = new ByteArrayOutputStream();
			ImageDecoder decoder = ImageCodec.createImageDecoder("tiff", is, null);
			ImageEncoder encoder = ImageCodec.createImageEncoder("png", out, null);
			encoder.encode(decoder.decodeAsRenderedImage());
			byte[] b = out.toByteArray();
			ByteArrayInputStream bais = new ByteArrayInputStream(b);
			return bais;
		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			try {
				if (out != null) {
					out.close();
				}
				if(is!=null){
					is.close();
				}
			} catch (IOException e) {
				e.printStackTrace();
			}

		}

		return null;
	}

	
	
}
