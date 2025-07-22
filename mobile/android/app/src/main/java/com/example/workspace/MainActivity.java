package com.example.workspace;

import android.os.Bundle;
import com.getcapacitor.BridgeActivity;
import java.util.ArrayList;
import com.getcapacitor.Plugin;
import com.example.plugins.updater.CapacitorUpdater;

public class MainActivity extends BridgeActivity {
  @Override
  public void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);

    registerPlugin(CapacitorUpdater.class);
    // Initializes the Bridge
    // this.init(savedInstanceState, new ArrayList<Class<? extends Plugin>>() {{
    //   // Add your plugin to the list
    //   add(CapacitorUpdater.class);
    // }});
  }
}
