package tmnt.brokenpipe.com.tmntminipinballdmd;

import android.app.Activity;
import android.graphics.Color;
import android.os.Bundle;
import android.webkit.WebView;
import android.webkit.WebViewClient;

public class MainActivity extends Activity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        getWindow().setStatusBarColor(Color.TRANSPARENT);

        setContentView(R.layout.activity_main);

        WebView dmd = (WebView) findViewById(R.id.dmd);

        dmd.setWebViewClient(new WebViewClient());
        //dmd.setWebChromeClient(new WebViewClient());
        dmd.clearCache(true);
        dmd.clearHistory();
        dmd.getSettings().setJavaScriptEnabled(true);
        dmd.getSettings().setAllowFileAccessFromFileURLs(true);
        dmd.getSettings().setAllowUniversalAccessFromFileURLs(true);


        //vistaWeb.getSettings().setJavaScriptCanOpenWindowsAutomatically(true);

        //dmd.loadUrl("http://www.google.com");
        dmd.loadUrl("file:///android_asset/index.html");

    }
}
