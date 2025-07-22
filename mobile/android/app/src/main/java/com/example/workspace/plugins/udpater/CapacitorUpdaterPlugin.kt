package com.example.plugins.updater

import android.content.pm.PackageInfo
import android.os.Build
import com.getcapacitor.JSObject
import com.getcapacitor.Plugin
import com.getcapacitor.PluginCall
import com.getcapacitor.PluginMethod
import com.getcapacitor.annotation.CapacitorPlugin
import java.io.File
import java.io.FileOutputStream
import java.io.IOException
import java.net.HttpURLConnection
import java.net.URL
import java.util.zip.ZipInputStream

@CapacitorPlugin(name = "CapacitorUpdater")
class CapacitorUpdaterPlugin : Plugin() {

    @PluginMethod
    fun getAppInfo(call: PluginCall) {
        try {
            val pInfo: PackageInfo = context.packageManager.getPackageInfo(context.packageName, 0)
            val version = pInfo.versionName
            val appId = context.packageName

            val ret = JSObject()
            ret.put("appId", appId)
            ret.put("currentVersion", version)
            ret.put("platform", "android")
            call.resolve(ret)
        } catch (e: Exception) {
            call.reject("Unable to get App Info", e)
        }
    }

    @PluginMethod
    fun download(call: PluginCall) {
        val urlString = call.getString("url")
        if (urlString == null) {
            call.reject("A 'url' must be provided.")
            return
        }

        // Use a background thread to avoid blocking the main UI thread
        Thread {
            try {
                val url = URL(urlString)
                val connection = url.openConnection() as HttpURLConnection
                connection.connect()

                if (connection.responseCode != HttpURLConnection.HTTP_OK) {
                    call.reject("Server returned HTTP " + connection.responseCode + " " + connection.responseMessage)
                    return@Thread
                }

                val fileLength = connection.contentLength
                val inputStream = connection.inputStream

                // Save the downloaded file to the app's private files directory
                val destinationFile = File(context.filesDir, "downloaded_update.zip")
                val outputStream = FileOutputStream(destinationFile)

                val data = ByteArray(4096)
                var total: Long = 0
                var count: Int
                while (inputStream.read(data).also { count = it } != -1) {
                    total += count.toLong()
                    // Publish progress
                    if (fileLength > 0) {
                        val progress = (total * 100 / fileLength).toInt()
                        val progressData = JSObject()
                        progressData.put("progress", progress)
                        notifyListeners("downloadProgress", progressData)
                    }
                    outputStream.write(data, 0, count)
                }

                outputStream.close()
                inputStream.close()

                val ret = JSObject()
                ret.put("path", destinationFile.absolutePath)
                call.resolve(ret)

            } catch (e: Exception) {
                call.reject("Download failed.", e)
            }
        }.start()
    }

    @PluginMethod
    fun applyUpdate(call: PluginCall) {
        val path = call.getString("path")
        if (path == null) {
            call.reject("A 'path' to the downloaded bundle must be provided.")
            return
        }

        // It's highly recommended to use a robust, well-tested library for this.
        // This is a simplified example.
        try {
            val zipFile = File(path)
            val targetDirectory = File(context.filesDir, "ota-update")

            // Clear the old update directory before unzipping the new one
            if (targetDirectory.exists()) {
                targetDirectory.deleteRecursively()
            }
            targetDirectory.mkdir()

            // Unzip the new bundle
            ZipInputStream(zipFile.inputStream()).use { zis ->
                var zipEntry = zis.nextEntry
                while (zipEntry != null) {
                    val newFile = File(targetDirectory, zipEntry.name)
                    if (zipEntry.isDirectory) {
                        newFile.mkdirs()
                    } else {
                        // Ensure parent directory exists
                        File(newFile.parent!!).mkdirs()
                        FileOutputStream(newFile).use { fos ->
                            zis.copyTo(fos)
                        }
                    }
                    zipEntry = zis.nextEntry
                }
            }
            
            // At this point, you would typically store the path to `targetDirectory`
            // in SharedPreferences and then programmatically restart the app
            // or instruct the MainActivity to reload the WebView.

            // For this example, we'll just resolve the call.
            // The web layer is responsible for triggering the reload.
            call.resolve()

        } catch (e: IOException) {
            call.reject("Failed to apply OTA update.", e)
        }
    }
}
