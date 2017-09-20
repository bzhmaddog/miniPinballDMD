package tmnt.brokenpipe.com.tmntminipinballdmd;

import android.app.Activity;
import android.graphics.Color;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.webkit.WebChromeClient;
import android.webkit.WebView;
import android.webkit.WebViewClient;

import javax.microedition.khronos.opengles.GL10;

public class MainActivity extends Activity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        getWindow().setStatusBarColor(Color.TRANSPARENT);

        setContentView(R.layout.activity_main);

        //String version = javax.microedition.khronos.opengles.GL10.glGetString(GL10.GL_VERSION);
        //Log.w("GL", "Version: " + version );


        WebView dmd = (WebView) findViewById(R.id.dmd);

        dmd.setWebViewClient(new WebViewClient());
        dmd.setWebChromeClient(new WebChromeClient());

        dmd.clearCache(true);
        dmd.clearHistory();
        dmd.getSettings().setJavaScriptEnabled(true);
        dmd.getSettings().setAllowFileAccessFromFileURLs(true);
        dmd.getSettings().setAllowUniversalAccessFromFileURLs(true);

        dmd.setLayerType(View.LAYER_TYPE_HARDWARE, null);
        //dmd.setLayerType(View.LAYER_TYPE_SOFTWARE, null);

        dmd.getSettings().setMediaPlaybackRequiresUserGesture(false);

        //vistaWeb.getSettings().setJavaScriptCanOpenWindowsAutomatically(true);

        //dmd.loadUrl("http://html5doctor.com/demos/video-canvas-magic/demo4.html");
        dmd.loadUrl("file:///android_asset/index.html");
        //dmd.loadUrl("http://www.williammalone.com/articles/create-html5-canvas-javascript-sprite-animation/downloads/sprite-animation-demo/sprite-animation-demo.html");
        //dmd.loadUrl("http://apng.onevcat.com/demo/");

    }
}
